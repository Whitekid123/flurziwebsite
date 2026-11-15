# FlurziHQ — reference-led corporate direction
Capture date: 15 November 2026. Target: existing Next.js 16 / React site.
This is an original composition using FlurziHQ's supplied identity and product content.

## Evidence
### Microdose Studio
Source: https://microdose.studio/
Inspected: desktop hero and two scrolled states at 1440 × 1000; Firecrawl desktop capture.
Local evidence: screenshots/references-nov15/microdose-browser.png and microdose-scroll-1.png.
Observed: left-aligned editorial headline, large work imagery immediately below the opening, generous whitespace, compact navigation, image-heavy portfolio. Browser inspection found GSAP, ScrollTrigger, Lenis and a portfolio carousel.
Extracted branding: Geist; primary blue #1F34C9; white background. Browser-computed H1: 72px at the captured width.
Asset examples: /carousel-images/carousel-01.webp and /project-images/treat/key-visual.jpg. Reference assets were inspected, not incorporated into FlurziHQ.

### Loopsii
Source: https://loopsii.com/
Inspected: hero and two scrolled states at 1440 × 1000.
Local evidence: screenshots/references-nov15/loopsii-browser.png and loopsii-scroll-1.png.
Observed: geometric modules, a visible layout grid, large sans-serif type, asymmetric explanation sections and a graphic that reorganizes into a circular composition below the hero. Browser found six canvases. These captures demonstrate different scroll states, not a complete motion audit.
Extracted branding: Saans variable; light #F0F0F0; lime #C4F041; sage #AAC2AA. The scraper's H1/body size classifications are inconsistent with the visible text and are not implementation specifications.
Its dashboard examples and commercial claims belong to Loopsii and are not reused.

### S/C Aesthetic Labs
Source: https://sc-aesthetic-labs.com/
Inspected: hero, mid-scroll and close-up states at 1440 × 1000.
Local evidence: screenshots/references-nov15/aesthetic-browser.png, aesthetic-scroll-1.png and aesthetic-scroll-2.png.
Observed: full-screen monochrome visual, restrained monospaced labels, stable foreground identity while the image rotates and moves into a close-up on scroll.
Browser evidence: a non-autoplay video at /herovideo/hero-scroll-scrub.mp4. The source filename and observed frame changes support a scroll-driven sequence.
Extracted branding: AL Suisse / AL Mono; dark #151616, pale #F2F4F4, orange #FF4D00. These proprietary fonts and imagery are not copied.

## FlurziHQ decisions
- Preserve the existing pine identity, local Inter Tight font, real logos, product descriptions and availability distinctions.
- Use one full-screen liquid composition for the company opening. Water remains interactive; seven compact geometric pieces rearrange automatically above it. The oversized reflective loop was removed following user feedback. The water uses the existing canvas; the pieces use CSS transforms.
- Keep the headline readable beside the compact geometric composition; let scroll expand the surface and move type. This is an original interpretation of S/C's stable identity and changing visual.
- Recompose seven distinct geometric pieces around HQ in the company introduction. Seven means seven actual platforms; it is not a decorative business metric.
- Present Flurzi360, EndNovel and Flurzi Commit as large editorial chapters. Their backgrounds and imagery remain distinct. Commit remains explicitly in launch preparation.
- Present the four development platforms as direct-link editorial rows, with concise purpose statements and actual stages.
- Use sticky stacking only on large screens. Mobile and reduced-motion use normal document flow.

## Proposed tokens and composition
These are target choices, not extracted reference measurements.
- Paper #F1F0E9; inset paper #E8E7DF; deep ink #080F0E.
- Pine #1C4A3A; light pine #B2DCC4; neutral typography derived from existing site tokens.
- Inter Tight for display and reading; system monospace for short indices.
- Main gutters 5vw desktop / 24px mobile. Hero display about 8.8vw desktop / 13.5vw phone.
- Portfolio chapters approximately 570px minimum height on desktop, with a text/art split of 0.8:1.2.
- Native links, visible focus, standard scrolling, no simulated app controls.

## Motion and fallback
- Desktop hero: existing 30fps on-demand WebGL renderer, pointer ripples and scroll-linked enlargement.
- Background pauses on request, document invisibility and departure from the viewport.
- Mobile: lightweight animated CSS surface and geometric composition; no WebGL.
- Reduced motion: static type, static geometric composition, no continuous orbit, no WebGL, no sticky portfolio.
- No-JavaScript content remains visible and all portfolio links remain usable.

## Validation and limits
Use scripts/verify-homepage.mjs for 320, 390, 768, 1024, 1440 and 1920px, reduced motion, real artwork, links and runtime errors.
The references were inspected on desktop; their complete mobile behavior and every hover state were not audited. FlurziHQ's mobile layout is separately designed and verified.

## Complete homepage revision
- Technology: four illustrated chapters with distinct workforce, culture, commitments and intelligence motion.
- Progress: four stepped, colour-coded stage panels retaining actual product status.
- Purpose: a folding geometric composition beside the mission and company record.
- Partnerships: a pale-green invitation with a large directional contact link and grid detail.
- Continuous effects pause off-screen and respect reduced motion. The hero pause control pauses all ambient CSS motion.
