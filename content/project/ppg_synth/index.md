---
title: Developing a Synthetic Photoplethysmography Generative Adversarial Network Wave Generation Model using MIMIC-IV Waveform Dataset
date: 2024-09-01
tags:
  - Python
  - ANN
  - PPG
---

Status: Data Acquisition

<!--more-->

Synthetic biomedical data plays a crucial role in the field of healthcare and medical research by providing simulated datasets that mimic real-world patient information. These synthetic datasets are created using algorithms to generate data that closely resembles actual patient records while ensuring privacy and confidentiality. These data can then be used for various purposes, including simulations, testing, and predictive models. By leveraging synthetic data, researchers can analyze and validate hypotheses, improve healthcare systems, and advance medical knowledge in a safe and ethical manner.

## Goal
This project aims to develop a framework for generating synthetic photoplethysmography (PPG) waveforms using Generative Adversarial Networks (GANs). The synthetic waves can be used to enhance simulations and research in biomedical informatics, providing a scalable and ethical alternative to real patient data.

## Methodologies:
- Data Source: The project utilizes PPG wave data acquired from our [previous study](https://drdianaty.com/project/ppg_mi/) on detecting type 2 myocardial infarction (MI) using PPG signals. This dataset includes diverse PPG waveforms along with associated patient demographics and clinical information.

- Data Processing: Input is received as NPZ compressed numpy arrays of filtered high-quality one-minute lenght of PPG waves and their corresponding fidicual points. We use a 70:30 train-test split and 10-fold cross validation.

- Model Development: A GAN architecture consisting of a generator and discriminator is implemented using Tensorflow. The generated wave's biomarkers are evaluated against real-world PPG waves from MIMIC-IV dataset.
the synthetic data closely mimics real-world PPG signals.

## Tools Used
* Python(numpy, pandas, pyppg, Tensorflow)