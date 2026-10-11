# Flurzi Limited — corporate website implementation

The approved corporate direction is now implemented in the Next.js application. `docs/design-preview/index.html` is the earlier standalone concept, not the running website.

## Review the actual application

Run `npm.cmd run dev -- -p 3411` and open **http://localhost:3411**. For a production review, use `npm.cmd run build`, then `npm.cmd start -- -p 3411`. Stop an existing server on that port before starting another.

The current navigation is Company, Ecosystem, Technology & Innovation, Partnerships, and Contact. FAQs and the four legal pages remain accessible in the footer. The ecosystem directory supports filtering and links to seven individual platform pages.

## What changed

- The homepage establishes the parent company before introducing the ecosystem. Its current sequence is the liquid opening, a large company statement, four technology directions, an interactive seven-platform ownership view, development progress, the mission and verified company record, and business opportunities. The two large product showcases have been removed; genuine imagery supports the selected platform inside the portfolio.
- The original company logo is preserved. The hero uses liquid motion rather than a diamond or product-window collage. The palette extends the existing navy, cyan, blue and lime identity.
- The Company page includes the approved mission and vision, the meaning of Flurzi, the portfolio direction, and a factual timeline. Leadership is withheld pending permission.
- Technology & Innovation explains the four areas of work and links to the corresponding platform scopes and stages. Partnerships offers business, platform-collaboration and future-opportunity journeys.
- Each platform has a description, audience, stage, scope, availability context, and appropriate next steps. No unavailable platform has an invented signup link or fabricated screenshot.
- `/projects` permanently redirects to `/innovation`. `/products/sponsorsafe`, `/products/playvault` and `/products/flurzi-x` redirect to the current product routes.
- Shared navigation, footer, FAQs, titles, descriptions, canonical URLs, sitemap and legal-page company/product references use the current identity.

## Content authority

The founder's supplied October 2026 response takes precedence over earlier marketing copy. `lib/site-content.ts` is the active source for company and platform data.

| Platform | Current stage | Public presentation |
| --- | --- | --- |
| EndNovel | Operational | Genuine platform image and direct website link |
| Flurzi360 | Existing foundation; expansion underway | SponsorSafe HR image explicitly labelled as the foundation; no invented new domain |
| Flurzi Commit | Preparing for launch; financial integrations pending | Current website image/link labelled as launch preparation |
| FlurziX | Under development | Commerce direction, no fabricated product interface |
| FlurziRush | Under development | Gaming direction; historical PlayVault name only in rebrand context |
| Flurzi Cortex | Under development | Approved intelligent-systems/infrastructure scope only |
| Flurzi Cinema | In development | Development website image/link; no assertion of a launched viewing service |

Companies House company 16640198 supplies the incorporation date, registered address and 13 July 2026 legal name change. The supplied August brand milestone remains a founder question, rather than being conflated with the legal date.

## Enquiries and publication dependencies

The public email, phone and leadership permission remain unconfirmed, as instructed. The contact page offers topic routing and an accessible enquiry draft form. With no approved email configured, it downloads a local text file and explicitly states that nothing has been sent or stored. The registered postal address is displayed. This is not an email-delivery backend.

The source retains an email-draft branch for a subsequently approved `COMPANY.email`; it does not silently send messages. An actual submission backend would be a separate integration with delivery and failure handling.

The four existing policy pages are retained. Company identity, product names, stages and contact references have been aligned; this is not a new legal review or an assertion that all planned processing is active. Existing policy provisions should be checked by the company before publication. No financial provider partnership, regulatory approval, new feature availability or commercial pricing has been invented.

See [questions for the founder](design-preview/QUESTIONS-FOR-FOUNDER.md). These questions do not block review of the implemented design.

## Motion and accessibility

- Lazy-loaded desktop water scene, limited frame rate, offscreen/hidden-tab pause, manual pause control and a CSS fallback.
- Lightweight mobile hero, live reduced-motion handling and no forced WebGL on small screens.
- Masked headline entrances, a scroll-linked company statement, drawn contour artwork, a sticky desktop technology rail with section links and current-area highlighting, a staggered portfolio reveal, and route/menu transitions. Mobile flows naturally and reduced motion removes the held sections. Content remains available without animation.
- The portfolio supports mouse, touch, arrow keys, Home and End. All seven platforms remain visible, with a labelled detail panel and a real link to the selected platform page. Its connecting lines represent the company portfolio, not shared accounts or technical integrations.
- Keyboard menu navigation, focus containment and restoration, inert background, Escape dismissal and scroll-lock cleanup.
- Native FAQ disclosures, labelled form inputs, honest delivery state, pressed-state filters and an announced result count.
- Existing media configuration remains in `lib/media.ts`; supplied future imagery/video can replace the current hero media without changing the site hierarchy.

## Verification

Completed on 11 October 2026 against the local production build at port 3411:

- Production build and TypeScript passed; all current routes were prerendered.
- Full-site browser suite: **265/265 passed**, no runtime errors.
- Hero motion/fallback suite: **24/24 passed**, no runtime errors.
- All 18 current pages checked at 1440px and 390px. Additional homepage/menu checks at 320px, 390px, 768px and 1024px; contact checked at 320px.
- Desktop and mobile screenshots inspected for hierarchy, typography, spacing, genuine imagery and contact clarity.
- EndNovel and Companies House were accessible through the web inspection tool. Direct GET checks returned HTTP 200 for the existing Commit landing page and Cinema website; these responses do not change their development statuses.
- `git diff --check` passed. No production deployment or Git push was performed.

The first build failed because Google Fonts was unavailable. The existing Inter Tight Latin font is now self-hosted with its OFL licence, and the subsequent build passed without that dependency. Two browser-test assumptions were corrected (root canonical URL trailing slash and selecting a native FAQ summary); the full suite then passed.

`npm.cmd run build` validates the production bundle and TypeScript.

`node scripts/check-corporate-site.cjs http://localhost:3411` checks all current routes, metadata, images, internal destinations, status filtering, legacy redirects, the 404 journey, mobile sizing, menu keyboard behaviour, enquiry preselection/download and the sitemap. Screenshots and machine-readable results are written to `screenshots/corporate-site/`.

`node scripts/check-corporate-hero.cjs http://localhost:3411` checks actual water motion, pause/resume, mobile and reduced-motion behaviour, no-WebGL fallback and hero navigation. Historical scripts that assert the retired four-product layout are not acceptance criteria for this redesign.

No commit, push or production deployment is part of this local implementation.
