#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const { exiftool } = require('exiftool-vendored');

const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.tif', '.tiff', '.avif', '.heic'
]);

const FILE_TYPE_EXT = {
  'JPEG': '.jpg',
  'PNG': '.png',
  'WEBP': '.webp',
  'GIF': '.gif',
  'TIFF': '.tiff'
};

const DEFAULT_DIRECTORIES = ['assets', 'content', 'static', 'data', 'layouts'];

const args = process.argv.slice(2);
const isStaged = args.includes('--staged');
const isCheckOnly = args.includes('--check');
const isQuiet = args.includes('--quiet');

function log(...messages) {
  if (!isQuiet) {
    console.log(...messages);
  }
}

function getStagedImages() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return output
      .split('\n')
      .map(f => f.trim())
      .filter(f => f && fs.existsSync(f) && IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));
  } catch (err) {
    log('Warning: Unable to get staged files from git:', err.message);
    return [];
  }
}

function getAllImages(dirs) {
  const imageFiles = [];
  function traverse(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', 'public', 'resources', '.git', '.trash'].includes(entry.name)) continue;
        traverse(fullPath);
      } else if (entry.isFile()) {
        if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
          imageFiles.push(fullPath);
        }
      }
    }
  }
  for (const d of dirs) {
    traverse(d);
  }
  return imageFiles;
}

// Essential structural tags that are intrinsic to image decoding and contain no personal metadata
const SAFE_TAGS = new Set([
  'SourceFile', 'errors', 'warnings', 'ExifToolVersion', 'FileName', 'Directory',
  'FileSize', 'FileModifyDate', 'FileAccessDate', 'FileInodeChangeDate', 'FilePermissions',
  'FileType', 'FileTypeExtension', 'MIMEType', 'ImageWidth', 'ImageHeight',
  'EncodingProcess', 'BitsPerSample', 'ColorComponents', 'YCbCrSubSampling',
  'ImageSize', 'Megapixels', 'ColorTransform', 'BitDepth', 'ColorType',
  'Compression', 'Filter', 'Interlace', 'HasAlpha', 'SignificantBits',
  'PixelsPerUnitX', 'PixelsPerUnitY', 'PixelUnits', 'SRGBRendering', 'Gamma',
  'WhitePoint', 'PrimaryChromaticities', 'Palette', 'TransparentColor',
  'ResolutionUnit', 'XResolution', 'YResolution', 'JFIFVersion', 'ExifByteOrder'
]);

function hasSensitiveMetadata(tags) {
  for (const key of Object.keys(tags)) {
    if (!SAFE_TAGS.has(key)) {
      return true;
    }
  }
  return false;
}

async function scrubFile(filePath, fileType) {
  const ext = path.extname(filePath).toLowerCase();
  const expectedExt = FILE_TYPE_EXT[fileType];

  if (expectedExt && expectedExt !== ext && ext !== '.jpeg') {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'img-scrub-'));
    const tmpFile = path.join(tmpDir, `temp_image${expectedExt}`);
    try {
      fs.copyFileSync(filePath, tmpFile);
      await exiftool.write(tmpFile, {}, ['-all=', '-overwrite_original', '-m']);
      fs.copyFileSync(tmpFile, filePath);
    } finally {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
      if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir);
    }
  } else {
    await exiftool.write(filePath, {}, ['-all=', '-overwrite_original', '-m']);
  }
}

async function main() {
  let filesToProcess = [];

  if (isStaged) {
    filesToProcess = getStagedImages();
    log(`🔍 Checking ${filesToProcess.length} staged image(s)...`);
  } else {
    filesToProcess = getAllImages(DEFAULT_DIRECTORIES);
    log(`🔍 Checking ${filesToProcess.length} image(s) in repository...`);
  }

  if (filesToProcess.length === 0) {
    log('✅ No images found to process.');
    await exiftool.end();
    process.exit(0);
  }

  let scrubbedCount = 0;
  let unscrubbedCount = 0;
  const modifiedFiles = [];

  for (const filePath of filesToProcess) {
    try {
      const tags = await exiftool.read(filePath);
      const containsMetadata = hasSensitiveMetadata(tags);

      if (containsMetadata) {
        if (isCheckOnly) {
          log(`❌ Unscrubbed metadata detected: ${filePath}`);
          unscrubbedCount++;
        } else {
          log(`🧹 Scrubbing metadata from: ${filePath}`);
          await scrubFile(filePath, tags.FileType);
          scrubbedCount++;
          modifiedFiles.push(filePath);
        }
      }
    } catch (err) {
      console.error(`⚠️ Error processing ${filePath}:`, err.message);
    }
  }

  // If in staged mode and we modified files, re-stage them in git
  if (isStaged && modifiedFiles.length > 0) {
    log(`➕ Re-staging ${modifiedFiles.length} scrubbed image(s)...`);
    for (const f of modifiedFiles) {
      execSync(`git add "${f}"`);
    }
  }

  await exiftool.end();

  if (isCheckOnly && unscrubbedCount > 0) {
    console.error(`\n❌ Error: Found ${unscrubbedCount} image(s) with unscrubbed metadata.`);
    process.exit(1);
  }

  if (scrubbedCount > 0) {
    log(`\n✨ Successfully scrubbed metadata from ${scrubbedCount} image(s).`);
  } else {
    log(`\n✅ All ${filesToProcess.length} checked image(s) are clean (no metadata found).`);
  }
}

main().catch(err => {
  console.error('Fatal error in strip-image-metadata:', err);
  exiftool.end();
  process.exit(1);
});
