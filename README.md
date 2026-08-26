# TickTells Project Website

This repository contains the project page for:

> **Tick Tells: Characterizing and Exploiting Timing Side Channels in Zero-Permission Mobile Sensor Stacks**

The page is built with Vue 3 and Vite. Website copy, reported metrics, and figures are derived from the TickTells manuscript. The site uses TickTells assets and paper figures only.

## Local development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
```

The generated static site is written to `dist/`.

## GitHub Pages deployment

1. Create a GitHub repository and upload the complete project.
2. Use `main` as the default branch.
3. In **Settings → Pages**, select **Deploy from a branch**, then choose the `gh-pages` branch and `/ (root)`.
4. Push to `main`, or run **Deploy TickTells to GitHub Pages** manually from the Actions tab.

The included workflow uses Node.js 22 and automatically selects the correct Vite base path for both user-site repositories (`username.github.io`) and regular project repositories.
