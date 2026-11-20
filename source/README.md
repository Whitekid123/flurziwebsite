# FLURZIHQ — Complete Cinematic Website Redesign (Release 05)

This project contains the complete FLURZIHQ Next.js website. The approved cinematic homepage from Release 04 has been preserved, and all the existing secondary routes have been redesigned to harmonise with its high-contrast forest-green/ivory editorial identity, immersive imagery, refined typography and intentional scroll-linked motion.

## What's included

- Original approved homepage, with responsive navigation, scroll-directed full-screen chapter sequences, the seven-platform presentation, and reduced-motion support.
- New editorial About experience with company story, timeline, team portraits and a responsive, scroll-controlled manifesto.
- Reskinned, working seven-platform ecosystem directory with original category filters and honest availability stages.
- Seven individual cinematic product pages: EndNovel, Flurzi360, Flurzi Commit, FlurziX, FlurziRush, Flurzi Cortex and Flurzi Cinema. Existing links, features, distinctions between live and planned capabilities, and existing product visualisations remain.
- Redesigned Technology & Innovation, Partnerships, Contact, FAQs, Testing Opportunity and legal pages (privacy policy, terms, disclaimer and data protection).
- Responsive shared header/footer, mobile menu, media reveals, section transitions, gallery hover previews and quiet motion for information-heavy/legal pages.
- Original content data, company contact information, API endpoint, legal content, redirects, assets and supporting documentation retained. No false achievements or launch claims added.

The original `/projects` route still redirects to `/innovation`, as it did before. Legacy product aliases also retain their redirects.

## Run the live Next.js website

Requirements: Node.js supported by the Next.js version in package-lock.json and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Before deployment, run:

```sh
npm run build
npm run start
```

**Environment:** `.env.example` documents settings. Contact form sending requires your configured server-side contact mail integration and Cloudflare Turnstile; without that configuration it shows the original honest 'enquiries not open yet' state. Secrets are not included. No changes were made to the original sending API or security logic.

## Important files

- `app/page.tsx`, `components/FlagshipHome.tsx`, `app/flagship-home.css`, `public/flagship/`: approved animated homepage and its assets.
- `app/cinema-subpages.css`: shared responsive design system for all other pages.
- `components/PageHeroArt.tsx`: page-specific original compositions using existing Flurzi media.
- `components/ProductHeroArt.tsx`: distinctive artwork for all seven product pages.
- `components/PageInterlude.tsx`: type-led scroll chapters.
- `components/PageMotion.tsx`: GSAP scroll and entrance choreography on secondary pages, respecting reduced-motion preferences.
- `components/hq/HqDirectory.tsx`: existing sector filtering with new editorial hover previews.
- `app/[slug]/page.tsx`: legal document templates, complete original text and new on-page section navigation.
- `lib/site-content.ts`, `lib/legal-content.json`: company, platform and legal copy preserved.
- `app/api/contact`: original contact submission API kept intact.
- `README-ORIGINAL.md`, `docs/`, `scripts/`: retained supporting project content.

## Offline preview

The **complete download** also contains a `preview/` folder with `index.html` and 18 secondary-page HTML snapshots. Extract the whole ZIP, then open `preview/index.html` in Chrome or Edge. Navigate to each subpage from the menu or product links.

The preview pages have standalone CSS and native Web Animations for approximate page introductions, details and filters. **The production site uses React/Next.js and GSAP; use the Next.js project to evaluate full functionality.** The contact form is displayed in its unconfigured state in the standalone preview and cannot submit there.

## QA and deployment limitations

- 18 redesigned secondary-page templates visually reviewed in Chromium, including desktop (1440×900), phones (390×844), selected compact phones (320×568) and tablets (768×1024): **47 sampled layouts with no horizontal overflow or JavaScript page errors**.
- Desktop/mobile menu, FAQ disclosure, directory sector filtering, legal section navigation and 551 preview local links/image references checked.
- 58 application TypeScript/TSX files passed syntax transpilation (not a complete type check).
- This environment could not install missing Next.js dependencies from the public npm registry, so **full `next build`, deployment smoke tests, physical-device tests and real form delivery are not verified here**. Run the commands above before production deployment.

The redesign deliberately avoids generic futuristic spheres and invented imagery; the distinct product artwork is limited to existing Flurzi media and original typography-based compositions. The legal copy and product stages should be reviewed by the company before publishing.
