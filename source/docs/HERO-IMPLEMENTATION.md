# Corporate hero — first implementation change

11 October 2026. Following the user's instruction to start implementation and remove the preview's diamond, the actual Next.js homepage opening now leads with the company proposition over decorative liquid light. The original logo remains in the header. No new monogram or floating product geometry appears in the hero.

## Changes

- `InteractiveOpening.tsx`: corporate statement, ecosystem/company links, short arrival reveal, normal scrolling and pause control.
- `CorporateWater.tsx`: the existing liquid surface in a dedicated demand-rendered canvas, capped at 30fps and DPR 1. Rendering stops offscreen, when the document is hidden, or while paused. No product texture downloads in the hero.
- `corporate.css`: responsive composition and animated CSS fallback. Mobile uses the lighter fallback. Reduced motion freezes decorative movement and removes WebGL. A context-loss/error fallback preserves content and links.
- `SiteHeader.tsx`: maintains the dark header through the new hero height.
- The standalone design preview also removes the diamond and uses an ambient light composition.

This is the first hero implementation slice, not completion of the whole corporate redesign. Remaining homepage sections, the seven-platform application data migration, individual page corrections, metadata and legal content still require the planned rollout. The seven-platform design preview remains the content reference. Contact and leadership questions remain in `design-preview/QUESTIONS-FOR-FOUNDER.md`.

The existing optional `HERO_MEDIA` video/poster configuration is retained as a decorative background alternative. It pauses with the hero controls and when offscreen; reduced motion uses the poster, and media failures retain the CSS fallback. The new screen-height composition uses looping footage rather than a long scroll-scrub sequence; final footage needs framing review. Product video support is unchanged.

## Validation

- Production build passed: compilation, TypeScript and all 17 generated outputs.
- `node scripts/check-corporate-hero.cjs http://localhost:3410`: 24/24 checks passed, no runtime errors. Verified visible water movement and frozen pixels when paused, original logo, CTA navigation/back, mobile menu and layout at 390px/320px, live reduced-motion changes and WebGL-unavailable fallback.
- `node docs/design-preview/check-preview.cjs`: 46/46 preview checks passed following diamond removal.
- Desktop and mobile implementation captures are in `screenshots/corporate-hero/`; refreshed design captures remain in `docs/design-preview/`.
- Nothing pushed or deployed. The local production preview uses port 3410.
