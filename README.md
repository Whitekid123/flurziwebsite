# Flurzi corporate website

A corporate Next.js website for Flurzi Limited, with a complete company-led homepage and 18 public pages. The seven-platform ecosystem, company story, innovation direction, partnerships, contact journeys and shared navigation are implemented in the application.

**Review the actual website at http://localhost:3411 after starting it below.** `docs/design-preview/index.html` is the earlier standalone concept; it is not the Next.js website.

## Run

```sh
npm ci
npm run dev -- -p 3411
npm run build
npm start -- -p 3411
```

## Pages

Home; Ecosystem; seven platform detail pages; Company; Technology & Innovation; Partnerships; FAQ; Contact; Privacy policy; Terms; Disclaimer; Data protection. Former Projects, SponsorSafe, PlayVault and Flurzi X URLs redirect to their current destinations.

## Active implementation

- `components/EditorialHome.tsx`: homepage content
- `components/InteractiveOpening.tsx` and `CorporateWater.tsx`: company-led hero with decorative liquid light, pause control, mobile and reduced-motion fallbacks
- `components/EcosystemDirectory.tsx`: all seven platforms, status labels and accessible category filters
- `components/HomeMotion.tsx`: company statement, drawn technology contours, scroll progress and portfolio reveal
- `components/CompanyStatement.tsx`, `CorporateDirections.tsx`, `CorporatePortfolio.tsx`: company-led narrative, technology chapters and accessible seven-platform selection
- `components/SiteMotion.tsx`: page reveals, product parallax, depth and pointer-following labels
- `components/SiteHeader.tsx` and `SiteFooter.tsx`: shared navigation and animated side menu
- `components/ProductGrid.tsx`: filtered ecosystem directory
- `app/corporate.css`, `app/transformation.css` and `app/corporate-story.css`: current corporate design, responsive layouts, company narrative and hero styling
- `lib/site-content.ts`: product, company and navigation content
- `lib/faq-content.json`, `lib/legal-content.json`: migrated source content
- `components/ContactDraft.tsx`: topic-aware enquiry preparation, with a local download while public email approval is pending

The earlier portal, product-window opening and single-page components remain as unused experiments. The active hero scene is CorporateWater, which reuses LiquidSurface without product windows or logo geometry.

## Audits

`docs/CONTENT-AUDIT.md` maps source pages to the implementation and records the Commit content discrepancy. Source snapshots are in `docs/source-audit/`.

`docs/MOTION-NOTES.md` records the Junca browser observations, their implementation, fallbacks and verification. Third-party assets are not included in the website.

## Images and footage

Edit `lib/media.ts`; place assets in `public/media/`.
The desktop opening uses an interactive liquid background. Set HERO_MEDIA.video and a poster to substitute decorative looping footage. Smaller screens use lightweight liquid-light styling; reduced motion freezes it or displays the supplied poster. Genuine platform screenshots are mapped in `lib/site-content.ts`. The retained `ScrollMedia` component is available for future supplied footage; the current platform stories use still images.

Keep headings outside footage and provide a poster. MP4/H.264 with frequent keyframes is a starting point; final framing and seek timing need tuning to the supplied assets.

Reduced-motion mode removes 3D, sticky storytelling and smooth scrolling, including when the preference changes during a visit.

## Checks

```sh
node scripts/check-corporate-site.cjs http://localhost:3411
node scripts/check-corporate-hero.cjs http://localhost:3411
node scripts/check-corporate-story.cjs http://localhost:3411
```

The site check covers all current routes, content, metadata, images, internal links, filters, redirects, menu keyboard behaviour, mobile layouts, enquiry routing/download and the sitemap. Results and desktop/mobile screenshots are saved under `screenshots/corporate-site/`. The hero check covers actual water movement, pause, reduced-motion and WebGL fallback behaviour. Historical checks that assert the retired four-product design are superseded.

Public contact details and leadership publication remain pending. The contact form currently downloads an enquiry draft and explicitly states that it has not sent anything. The registered postal address is displayed. See [implementation and publication dependencies](docs/CORPORATE-TRANSFORMATION.md) and [questions for the founder](docs/design-preview/QUESTIONS-FOR-FOUNDER.md).

`scripts/audit-content.mjs` refreshes live-source snapshots and overwrites imported policy/FAQ JSON. Review source changes before using refreshed content.

