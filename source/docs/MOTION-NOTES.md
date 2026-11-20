# Flurzi homepage and motion

**Historical reference study.** The product-led implementation described below has been superseded by the company-led narrative. Current files and behaviour are recorded in [CORPORATE-TRANSFORMATION.md](CORPORATE-TRANSFORMATION.md). The active homepage uses a liquid opening, company statement, four technology chapters and an interactive seven-platform portfolio. It has no four-window hero or large repeated product showcases.

All six reference sites were revisited in Chrome for the expanded homepage revision. Captures from arrival and two scroll positions are in `screenshots/references/`. The deeper Junca study remains in `screenshots/junca-motion/`.

## Reference decisions

| Reference | Observed direction | Applied to Flurzi |
| --- | --- | --- |
| [Junca](https://juncastudio.com/) | Coloured real-time opening, movement into a light editorial page, generous typography, staggered side menu | Pointer-responsive opening, expanding screen transition, large editorial statements and animated navigation |
| [Studio Mirage](https://studiomirage.io/) | Projects presented as immersive visual environments | Four substantial product chapters, each with a dedicated colour, image, motion and story |
| [Cypher Capital](https://www.cyphercapital.com/) | Clear hierarchy, sculptural visuals and spacious capability sections | Company context and product information stay readable between more expressive moments |
| [Armor](https://www.armor-bd.com/) | Saturated orange opening, warmer supporting sections and a longer corporate narrative | Stronger colour changes and a fuller company section |
| [Hitit](https://hitit.com/) | Atmospheric colour around a clear technology proposition | A broad company introduction, followed by specific product paths |
| [Sixes](https://sixescricket.com/) | Large type, contrasting colour fields and playful geometric accents | Oversized homepage typography, cobalt/teal/coral/amber scenes and expressive company visuals |

Reference assets, source code, claims, clients and testimonials were not copied.

## Homepage

1. All four platforms appear together in the opening, with four visible navigation links.
2. Pointer movement changes the angle of the original 3D composition. Hovering or focusing a product link brings its window forward.
3. Scroll moves into the composition and opens a mint ecosystem introduction.
4. SponsorSafe HR, Commit, Cinema and EndNovel each have a full product chapter with real imagery, audience, features and a detail-page link.
5. A cobalt company section pairs the company description with the original Flurzi logo.
6. A product chooser supports mouse, touch and arrow-key navigation.
7. Flurzi X and PlayVault have distinct previews, explicitly marked in development.
8. A short FAQ leads into the shared contact footer.

## Active files

- `components/InteractiveOpening.tsx`: opening, product links and screen transition
- `components/ProductDisplay.tsx`: four original 3D product windows
- `components/EditorialHome.tsx`: homepage sections and content
- `components/ProductFinder.tsx`: accessible product chooser
- `components/HomeMotion.tsx`: chapter reveals, sculpture and venture movement
- `components/SiteMotion.tsx`: page arrivals, product parallax and hover labels
- `components/SiteHeader.tsx`: animated drawer and keyboard behaviour
- `components/SmoothScroll.tsx`: scrolling with live reduced-motion support
- `app/home.css`, `app/motion.css`: homepage presentation, motion and fallbacks

## Fallbacks

Phones and tablets use all four product images instead of WebGL. Unsupported WebGL keeps that composition visible. Reduced motion removes WebGL, sticky storytelling, smooth scrolling and staggered reveals, including when the preference changes during a visit. Desktop rendering pauses when the opening leaves the viewport; rendering is capped at 30 frames per second and pixel ratio at 1.

The menu makes underlying content inert, supports Escape and backdrop dismissal, restores focus and unlocks scrolling after navigation. Faded hero links become inert during the scroll transition.

User footage remains supported through `HERO_MEDIA`. Its framing and seek timing need tuning once supplied.

## Verification

- `node scripts/check-expanded-home.mjs http://localhost:3400`: all four products, chapter content, chooser, keyboard, FAQ and four responsive sizes.
- `node scripts/check-motion.mjs http://localhost:3400`: rendered pointer differences, screen transition, hover movement, menu, routing, reduced motion and WebGL failure.
- `node scripts/verify-site.mjs http://localhost:3400`: all 14 routes and migrated content.

Screenshots and results are saved under `screenshots/expanded-home/`, `screenshots/motion/` and `screenshots/editorial/`.

## Original logo and liquid motion

The supplied logo matches the existing company assets at https://www.flurzi.com/images/flurzi-logo.png and https://www.flurzi.com/icon.png. They are stored unchanged in public/media and used by Brand.tsx, the company section and app/icon.png. The corporate accents now follow the logo's navy, lime, blue and cyan; individual product chapters retain their colours.

LiquidSurface.tsx renders a procedural water surface in the existing hero WebGL context. Pointer movement adds expanding ripples. LiquidScreen refracts each product texture, with stronger distortion on hover and during the scroll approach. Text and the company logo stay outside the distortion. A pause/resume control stops the water motion. Reduced motion and mobile retain the static four-product composition. Rendering stops when the hero is outside the viewport; rendering is capped at 30 frames per second and pixel ratio at 1.

Run node scripts/check-liquid-brand.mjs http://localhost:3400 to verify logo loading, shader errors, rendered surface movement, pause, reduced motion and mobile navigation.

