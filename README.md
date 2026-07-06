# Gunel Ahmadova — Portfolio

Personal portfolio website: React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion.
Dark & light mode, WCAG AA color contrast, fully responsive, case-study pages per project.

## Run it

```bash
npm install
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
```

## Where to edit content (no code knowledge needed)

| What | File |
|---|---|
| Bio, experience, skills, education, socials | `src/data/profile.ts` |
| All project text (titles, case-study copy) | `src/data/projects.ts` |
| Project images | `public/projects/<slug>/` |

### Adding better project images
1. Export a cover (~1600×1000) from Figma/Behance for each project.
2. Drop it in `public/projects/<slug>/cover.webp` (or `.png/.jpg` — update the `cover:` path).
3. For case-study screens, add files and list them in that project's `gallery: [...]`.
4. Projects without a `cover` automatically show a designed gradient placeholder.

Tip: preview a theme with `?theme=light` or `?theme=dark` in the URL.

## Deploy (free)
- **Netlify**: drag the `dist/` folder into app.netlify.com, or connect the repo. Add a
  redirect rule for the SPA: create `public/_redirects` containing `/* /index.html 200`.
- **Vercel**: `npx vercel` — auto-detects Vite.
