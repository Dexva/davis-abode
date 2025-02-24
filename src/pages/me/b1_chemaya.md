---
layout: ../../layouts/MeShowcaseLayout.astro
title: 'Chemaya'
pubDate: 2025-02-24
subtitle: 'my HS graduation research'
author: 'Davis'
image:
    url: '/assets/me/5_chemaya.png'
    alt: 'workstation UI of chemaya'
    width: 942
    height: 449
    scale: 0.45
linkText: 
externalURL: 
tags: ['code']
---

# Chemaya

During the pandemic, our chemistry class would have us do _virtual experiments_ on our computers because we couldn't visit the labs at school. While it was indeed the best alternative, I did feel it only thought us how to follow procedures and not how to truly handle lab equipment. Chemaya, which became my STEM research for highschool, is inspired by this gap.

Chemaya is a proof-of-concept of integrating a hand-gesture natural user interface (HGNUI) for a web-based virtual chemistry laboratory (VCL).

For the HGNUI, we trained a hand landmark detection model through Google MediaPipe. We then applied this to a web app, built with React, that uses a web camera to track the user's hand movements, which is then mapped to controls such as moving glassware and pouring substances. Simple chemistry logic and corresponding UI were also developed.