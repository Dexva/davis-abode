---
layout: ../../layouts/ThoughtsPostLayout.astro
title: 'About Abode'
pubDate: 2025/08/25
subtitle: 'a colophon on this site'
author: 'Davis'
tags: ['technical']
---

At [my GitHub](https://github.com/Dexva), the repo for this site is referred to as ``davis-abode``. Afterall, my goal for this place is to become my _digital abode_--literally, a homepage for my digital presence. With the site recently revamped to my liking, I've decided to write about the tools I used to build this house (as a somewhat beginner to WebDev).

## Main Stack

### 1 / [Astro](https://astro.build/)

In the past, I built websites with either: 

1. vanilla HTML + CSS + JS, or
2. React

Vanilla is lightweight, but is obviously not scalable. On the other hand, [React](https://react.dev/), while powerful and with great integration, was far too bulky for my liking. As someone with a Macbook that is seems to be eternally on <10 GB of free storage, neither was a good option.

But, after scrolling through [r/webdev](https://www.reddit.com/r/webdev/) for a while, I discovered [Astro](https://astro.build/)--a framework built for content-driven, static sites. That is what I exactly wanted (and needed) for this site, and so I gave it a shot. Currently, this entire site is built as an Astro project.

### 2 / [Tailwind](https://tailwindcss.com/)

In an earlier version of this site (~Feb 2025), I was styling everything with vanilla CSS. That didn't scale well over time (which sucked). Finally, when I picked up this project again during the summer of 2025, I decided to transition towards a styling library--for which I went with the famous [Tailwind CSS](https://tailwindcss.com/).

It was indeed a bit weird using at first as this was my first time styling outside of vanilla CSS, but after using the keywords again and again, the speed-up for development felt more apparent.

### 3 / [Preact](https://preactjs.com/)

Some parts of the site needed responsiveness, particularly at the [photos page](../../pages/photos.astro). With that, I needed to integrate a React-like library that allows for dynamic site rerenders. But, again, I didn't want to use React because of its bulkiness. Thankfully, [Gemini](https://gemini.google.com/) introduced [Preact](https://preactjs.com) to me. It has the React syntax I was already kinda familiar with, and so integrating it as an Astro island was much easier.

## Minor Tools

I also used other platforms/tools for non-coding tasks.

4. [Icons8](https://icons8.com/) - for high quality SVG icons.

5. [ToWebP](https://towebp.app/) - for converting my [photos](../photos) to a more web-friendly format.

6. [three.js](https://threejs.org/) - for the [landing](../) 3D showcase.

7. [SVGOMG](https://jakearchibald.github.io/svgomg/) - for optimizing the viewport on the SVG icons.

8. [PageSpeed Insights](https://pagespeed.web.dev/) - for checking site performance.


