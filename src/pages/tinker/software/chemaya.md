---
layout: ../../../layouts/TinkerShowcaseLayout.astro
title: 'Chemaya'
pubDate: 2025-08-21
subtitle: 'Hands-on virtual chemistry'
author: 'Davis'
image:
    url: '/assets/me/5_chemaya.png'
    alt: 'workstation UI of chemaya'
    width: 942
    height: 449
    scale: 0.45
linkText: GitHub Repo
externalURL: https://github.com/Dexva/chemaya-handistry
tags: ['code']
---

# Chemaya
_A virtual chemistry lab that uses hand gestures for a more intuitive, hands-on experience._

## The Inspiration
During the pandemic, my chemistry class moved to virtual labs. I found that while these simulations taught procedures, they lacked the tactile feel of handling real equipment. This gap between clicking buttons and actual lab work inspired Chemaya, my main STEM research project in high school.

## The Concept
Chemaya is a proof-of-concept that integrates a Hand-Gesture Natural User Interface (HGNUI) into a web-based virtual lab. Instead of a mouse, users interact with the experiment using their own hands, captured through their webcam, to create a more immersive and practical learning experience.

## Technical Breakdown
The system was built by combining machine learning with a modern web frontend:

- **Hand Gesture Recognition**: We trained a hand landmark detection model on a combination of in-house and external image datasets using [Google MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker) to recognize hand gestures and position.
- **Frontend & Interaction**: The web app was built in [React](https://react.dev/). It uses the webcam to track hand movements and map them to controls like moving beakers, pouring substances, and other lab actions.
- **Core Logic**: We also developed simple chemistry logic and a UI to simulate a simple calorimetry experiment.