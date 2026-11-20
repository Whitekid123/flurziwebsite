# FLURZIHQ cinematic homepage · Direction 03

**This is a working creative study, not a production-approved site or a redesign of every corporate subpage.**

## What changed
- `app/page.tsx`: new cinematic homepage, preserving all existing routes and legal/product pages.
- `app/flagship-home.css`: complete responsive art direction (forest / ivory / original product material).
- `components/FlagshipHome.tsx` and `lib/flagship-markup.ts`: homepage markup and motion entry point.
- `public/flagship/motion.js`: scroll-directed film and portfolio timeline plus pointer previews.
- `public/flagship/assets/`: crops of Flurzi's own product screenshots (no stock or AI-generated artwork).
- `public/flagship/index.html`: static version for testing if desired.
- `app/page.original.tsx.reference`: original page preserved for comparison.

## Running
`npm ci` then `npm run dev`; open the homepage. Node.js 20.9+ required (check Next.js's own requirements). The standalone preview is also available as a single self-contained file outside the project archive.

## Quality and implementation notes
- Browser QA was performed against the self-contained prototype at desktop and mobile widths and under reduced-motion preferences; see the included QA summary.
- The bundled Next.js app was **not** built here because dependency installation couldn't complete in the offline environment. Run `npm run build` and your existing visual QA before deployment.
- The HTML markup is trusted, static and owned by this repo, but should be refactored into JSX components before production. Do not insert untrusted strings into `FLAGSHIP_MARKUP`.
- The long-form opening and selected product transitions are desktop scroll-driven; mobile retains a scroll-driven opening and uses accessible stacked product chapters instead of sticky full-screen pinning.
- The site links preserve existing product URL routes and product availability wording; no launch status or metrics were fabricated.
- Existing company contact data remains unchanged.
