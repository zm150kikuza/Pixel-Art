# Pixel Art Maker

A dependency-free, frontend-only image-to-pixel-art web app. Images are processed locally with the browser Canvas API; no image upload or server is required.

## Use locally

Open `index.html` in a current browser. For the most reliable file-upload and download behaviour, serve this folder from any static web host or local web server.

## Deploy and embed in Google Sites

1. Upload the three files in this folder to a static host such as GitHub Pages, Netlify, Cloudflare Pages, or Firebase Hosting.
2. Confirm the hosted URL works over `https`.
3. In Google Sites, choose **Insert → Embed → By URL**, paste the hosted page URL, then resize the embedded frame.

Google Sites cannot run arbitrary HTML/JavaScript directly inside a normal page block, so hosting this app first and embedding its HTTPS URL is the compatible approach.

## Files

- `index.html` — accessible app structure
- `styles.css` — responsive visual design
- `app.js` — upload, Canvas pixelation, palettes, grayscale, and PNG export
