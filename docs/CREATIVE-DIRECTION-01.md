# FLURZIHQ — Creative Direction 01 / Editorial Motion

First working redesign study, 20 November 2026. This is a **prototype**, not a live redesign or a claim that every page is finished.

## Review the actual design

Open `public/vision-preview/index.html` in any modern browser. No Node.js, npm, build step, internet connection or extra assets are required if the entire `public` folder is present.

The interactive entry is also available at `/vision-preview/index.html` when the Next.js project is running.

## Experience and intentional visual decisions

- **Professional, not sci-fi.** Removed the old geometry, orbits and luminous procedural imagery from this design study. No abstract AI-generated assets or pseudo-metrics are used.
- **A visual identity grounded in real Flurzi material.** Kept the company's logo, Inter Tight font, supplied product screenshots and actual stages from `lib/site-content.ts`. Corporate text is newly written, not a fake achievement or a product claim.
- **Visual contrast creates curiosity.** A quietly animated, spacious paper-coloured opening changes into an oversized forest-green statement, then a high-contrast product index.
- **Signature animation / interaction.** The portfolio index allows hovering, focusing or pressing a project to trigger a directed image wipe, changing the live detail presentation. The hero's featured projects have their own accessible controls.
- **Honest representation.** Existing operational/Version 1 platforms remain distinct from launch preparation and development projects. Products with no supplied artwork receive a typographic identity rather than fabricated app screenshots.
- **Animation is designed around meaning.** Motion is attached to discovering products, reading editorial content, and controlled visual transitions. There are no continuous spinners, orbiting shapes, noise particles, or random animation clutter.
- **Device constraints.** Static images and CSS, not heavy WebGL. Includes native scroll, a small JavaScript controller, reduced-motion support, mobile navigation, keyboard focus, and pause-free static content when scripts are off.

## Prototype coverage

1. Animated hero with featured EndNovel, Flurzi360 and Flurzi Cinema artwork.
2. Dark company-statement chapter.
3. Seven-platform interactive editorial index, accurate status labels, and corresponding internal links.
4. Partnership invitation and footer.

## Deliberate limits and further work

- This first prototype is a new direction alongside the current homepage. It does not replace the live route and does not yet redesign company subpages.
- The real product visual assets are uneven in resolution and style, so a final art-directed asset set should be provided or developed, especially for platforms still under development. Nothing is invented to conceal this.
- Final timing, contrast, mobile spacing, compatibility and browser runtime should be reviewed in a local browser before making this the published homepage. The generation environment did not permit loading local pages in its Chromium browser; code was statically validated but no faithful browser-render screenshots were available.
- Current preview uses concise native Web Animations and IntersectionObserver rather than adding more dependencies. Port the approved result into Next.js components and the existing GSAP motion infrastructure once the visual direction is approved.

## Primary technical references (technique only)

- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP React cleanup and context: https://gsap.com/docs/v3/GSAP/gsap.context%28%29/
- Apple product presentation: https://www.apple.com/macbook-pro/
- Linear: https://linear.app/
- Existing local references: DESIGN.md and docs/MOTION-NOTES.md.

No third-party branding, images or copyrighted product design was lifted into this prototype.
