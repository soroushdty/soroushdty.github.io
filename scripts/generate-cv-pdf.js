const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('📄 Generating PDF CV from public/cv/index.html...');

  const cvHtmlPath = path.resolve(__dirname, '../public/cv/index.html');
  const outputPdfPath = path.resolve(__dirname, '../public/uploads/cv.pdf');
  const staticPdfPath = path.resolve(__dirname, '../static/uploads/cv.pdf');

  if (!fs.existsSync(cvHtmlPath)) {
    console.error(`❌ Error: ${cvHtmlPath} does not exist. Build the Hugo site first!`);
    process.exit(1);
  }

  // Ensure uploads directories exist
  fs.mkdirSync(path.dirname(outputPdfPath), { recursive: true });
  fs.mkdirSync(path.dirname(staticPdfPath), { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Navigate to local HTML file
  await page.goto(`file://${cvHtmlPath}`, { waitUntil: 'networkidle0' });

  // Generate PDF using print media styles
  await page.pdf({
    path: outputPdfPath,
    format: 'Letter',
    margin: {
      top: '0.4in',
      right: '0.4in',
      bottom: '0.4in',
      left: '0.4in'
    },
    printBackground: true
  });

  // Copy to static/uploads/cv.pdf as fallback
  fs.copyFileSync(outputPdfPath, staticPdfPath);

  await browser.close();

  const stats = fs.statSync(outputPdfPath);
  console.log(`✅ CV PDF generated successfully! Size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(` Saved to: ${outputPdfPath}`);
  console.log(` Saved to: ${staticPdfPath}`);
}

generatePDF().catch(err => {
  console.error('❌ Failed to generate CV PDF:', err);
  process.exit(1);
});
