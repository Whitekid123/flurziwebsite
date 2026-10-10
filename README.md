# Flurzi corporate website

A 14-page Next.js website for Flurzi Mobile App Limited, with content audited against the existing corporate and product sites.

## Run

```sh
npm ci
npm run dev
npm run build
npm start -- -p 3400
```

## Pages

Home; Products; four product detail pages; About; Projects; FAQ; Contact; Privacy policy; Terms; Disclaimer; Data protection.

## Active implementation

- `components/EditorialHome.tsx`: homepage content
- `components/InteractiveOpening.tsx` and `ProductDisplay.tsx`: four pointer-responsive product windows and a scroll transition into the ecosystem
- `components/ProductFinder.tsx`: keyboard-accessible product chooser
- `components/HomeMotion.tsx`: homepage chapter reveals, company logo and venture motion
- `components/SiteMotion.tsx`: page reveals, product parallax, depth and pointer-following labels
- `components/SiteHeader.tsx` and `SiteFooter.tsx`: shared navigation and animated side menu
- `components/ProductGrid.tsx`: product previews
- `app/editorial.css`, `app/motion.css` and `app/home.css`: layout and motion styles
- `lib/site-content.ts`: product, company and navigation content
- `lib/faq-content.json`, `lib/legal-content.json`: migrated source content
- `components/ContactDraft.tsx`: enquiry form that opens an email draft

The earlier portal and single-page components remain as unused experiments. The active 3D scene is ProductDisplay, not HeroMonogram.

## Audits

`docs/CONTENT-AUDIT.md` maps source pages to the implementation and records the Commit content discrepancy. Source snapshots are in `docs/source-audit/`.

`docs/MOTION-NOTES.md` records the Junca browser observations, their implementation, fallbacks and verification. Third-party assets are not included in the website.

## Images and footage

Edit `lib/media.ts`; place assets in `public/media/`.
The desktop opening presents all four product captures in an original 3D composition. Set HERO_MEDIA.video and a poster to substitute supplied footage. The smaller-screen fallback uses product images. Product grid previews support optional scroll video through PRODUCT_MEDIA.

Keep headings outside footage and provide a poster. MP4/H.264 with frequent keyframes is a starting point; final framing and seek timing need tuning to the supplied assets.

Reduced-motion mode removes 3D, sticky storytelling and smooth scrolling, including when the preference changes during a visit.

## Checks

```sh
node scripts/verify-site.mjs http://localhost:3400
node scripts/check-motion.mjs http://localhost:3400
node scripts/check-expanded-home.mjs http://localhost:3400
node scripts/check-liquid-brand.mjs http://localhost:3400
```

The site checks cover all routes, content, FAQ, contact validation and responsive navigation. Motion checks measure rendered pointer changes, screen transitions, hover movement, keyboard behaviour, back navigation and fallbacks. Results and screenshots are saved under `screenshots/editorial/` and `screenshots/motion/`.

The contact form prepares a draft in the visitor's email app; it does not claim backend delivery.

`scripts/audit-content.mjs` refreshes live-source snapshots and overwrites imported policy/FAQ JSON. Review source changes before using refreshed content.

