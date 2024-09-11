---
title: Detection of type 2 myocardial infarction from photoplethysmography using CNN-LSTM neural networks and manifold learning
date: 2023-10-26
tags:
  - Python
  - ANN
  - PPG
---

Status: Model Training
Dataset: MIMIC-IV, MIMIC-IV Waveform

Implementation: Python via Google Colab

Data Acquision: WFDB, pandas

Feature Engineering: Demographics (pandas), Comorbidities (ICD-10 code, Elixhauser Comorbidity Index)

Signal Processing and Storage: Numpy, Scipy

Visualization: Matplotlib

Preprocessing: pandas (one-hot encoding), sklearn (Standard Scaler)

Dimensionality Reduction: Sklearn (PCA, isomap, LLE, MLLE, HLLE, MDS)

Model Training: Tensorflow (CNN-LSTM)

<!--more-->
