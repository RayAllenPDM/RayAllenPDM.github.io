import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo is named RayAllen204.github.io, so the site lives at the root ("/").
// If you ever deploy from a repo with another name (e.g. "portfolio"),
// change base to '/portfolio/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
