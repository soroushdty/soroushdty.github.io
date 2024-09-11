---
title: Detection of type 2 myocardial infarction from photoplethysmography using CNN-LSTM neural networks and manifold learning
date: 2023-12-01
tags:
  - Python
  - ANN
  - PPG
---

Status: Model Training

<!--more-->

Type 2 myocardial infarction (MI) is characterized by an imbalance between oxygen supply and demand, often due to non-coronary factors. Unlike type 1 MI, which is caused by atherosclerotic plaque rupture, type 2 MI presents unique diagnostic challenges due to its varied etiology and clinical presentation.

Photoplethysmography (PPG) is a non-invasive technique used to detect blood volume changes in the microvascular bed of tissue. It is commonly used in pulse oximeters and wearable devices for monitoring cardiovascular parameters. Leveraging PPG data, along with patient demographics and comorbidities, offers a promising approach to improve the detection and differentiation of type 2 MI.

## Goal
This project's goal is to develop a robust ML model capable of accurately identifying type 2 MI and distinguishing it from type 1 MI, using one minute of PPG waves, along with patient demographics and comorbidities; Thereby enhancing early diagnosis and improving patient outcomes.

## Methodologies
- Dataset: MIMIC-IV and MIMIC-IV Waveform
- Implementation: Python via Google Colab
- Data Acquisition: WFDB, pandas
- Feature Engineering: Demographics (pandas), Comorbidities (ICD-10 code, Elixhauser Comorbidity Index)
- Signal Processing and Storage: Numpy, Scipy, Pyppg
- Visualization: Matplotlib
- Preprocessing: pandas (one-hot encoding), sklearn (Standard Scaler)
- Dimensionality Reduction: Sklearn (PCA, isomap, LLE, MLLE, HLLE, MDS)
- Model Training: Tensorflow (CNN-LSTM)