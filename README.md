# Ray Allen Castro — Portfolio

Personal portfolio with a Great Sage "Sage OS" theme, built with React + Vite.

**Live site:** https://rayallenpdm.github.io/ (or your Vercel URL)

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:5173

## Edit content
All text, skills, certifications, projects and links are in `src/data.js`.
Images are in `public/assets/`.

## Voice greeting (Fish Audio)
1. Copy `.env.example` to `.env` and put in your Fish Audio key and voice ID.
2. Run `npm run greeting`. This creates `public/assets/greeting.mp3`.
3. Commit the mp3. `.env` is git-ignored and must never be uploaded.

## Deploy on Vercel
1. Push this project to GitHub.
2. On vercel.com, click **Add New → Project** and import the repo.
3. Vercel detects Vite automatically (build: `npm run build`, output: `dist`). Click **Deploy**.
Every push to GitHub redeploys the site.

## Deploy on GitHub Pages
Pushing to `main` (or `master`) runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions** (one time only).
