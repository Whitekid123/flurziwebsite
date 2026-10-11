# Flurzi Limited — corporate design review

11 October 2026. This is the earlier standalone design prototype, retained for reference. The full corporate transformation is now implemented in the Next.js application, including all seven platform pages and the company, innovation and partnership routes. Review the running app at http://localhost:3411; see [the implementation guide](../CORPORATE-TRANSFORMATION.md). Nothing is deployed.

## Review

- Desktop and mobile homepage, expandable navigation, company story, seven platform detail dialogs and business enquiry selector.
- Original company logo and genuine existing website captures. SponsorSafe imagery is explicitly identified as the foundation undergoing transition.
- Decorative motion has a pause control and honours reduced-motion preferences. Ambient liquid light replaces the original diamond composition; the Next.js hero reuses the existing WebGL liquid surface.
- Enquiry selection is a preview only: no form submission, collection or delivery. Approved public contact information is still pending.
- Screenshots and browser-check results are generated beside this file for review.

## Validation completed

`node docs/design-preview/check-preview.cjs` passed 46/46 checks on 11 October 2026 with no browser script errors. Covered seven platform dialogs, availability labels, internal anchors, original asset loading, pause/reduced motion, menu keyboard containment, Escape/focus restoration, dialog-to-enquiry handoff, scroll locking and 390px/320px layouts. Desktop was checked at 1440px. These are prototype checks, not a production accessibility certification or a complete test of the unchanged Next.js application.

Review captures: `desktop.png`, `mobile.png`, `desktop-hero.png`, `mobile-hero.png`, `mobile-menu.png`, `company-detail.png`. Results: `validation.json`.

## Content authority

Use the founder's reply supplied on 11 October 2026 as the approved business direction, superseding older corporate/product marketing copy where it conflicts. A reachable product website does not mean the platform is commercially operational.

| Platform | Approved positioning | Status |
| --- | --- | --- |
| EndNovel | Digital reading, storytelling and audiobook entertainment | Operational |
| Flurzi360 | Global B2B workforce operating system; expanding the SponsorSafe HR foundation | Expansion underway; production validation incomplete |
| Flurzi Commit | Structured savings and financial commitments | Preparing for launch; financial integrations pending |
| FlurziX | E-commerce and online marketplace | Under development |
| FlurziRush | Interactive gaming and digital entertainment | Under development |
| Flurzi Cortex | Intelligent technology systems and supporting infrastructure | Under development |
| Flurzi Cinema | Digital film and entertainment | In development |

Flurzi360 is intended for self-service business onboarding without compulsory sales calls. It does not directly offer employment or visa sponsorship. Its broader HR, recruitment, payroll-related workflows, scheduling, analytics and AI-assisted scope is product direction at varying development stages, not a completed feature list. No new domain or signup link is invented.

FlurziRush is not a cash-earning/pay-to-play reward service. App availability, games catalogue, recommendations and advertising are planned direction, with community/streamer/live-interaction capabilities a future direction. No live download CTA.

FlurziX is an upcoming e-commerce marketplace, not banking infrastructure. Merchant services, commissions and promotional placements are potential commercial approaches; final arrangements are unconfirmed. Cortex remains limited to the supplied high-level description.

Mission and vision in the prototype reproduce the founder's approved text. International scale is an ambition, not an assertion of existing global operations. No invented metrics, certifications, customers, partnerships or testimonials.

## Corporate record checked

Companies House overview and filing history were read on 11 October 2026:

- Flurzi Limited, company number 16640198.
- Incorporated 11 August 2025; active private limited company.
- Registered office: Suite G04 1 Quality Court, Chancery Lane, London, England, WC2A 1HR.
- Legal name-change certificate issued 13 July 2026.
- Kamsiriochi David Emmanuel is listed as an active director. Founder designation comes from the supplied reply.

Sources: [overview](https://find-and-update.company-information.service.gov.uk/company/16640198), [filing history](https://find-and-update.company-information.service.gov.uk/company/16640198/filing-history), [officers](https://find-and-update.company-information.service.gov.uk/company/16640198/officers).

The initial search snippet had the old Coventry office. The opened overview and filing history identify the London address. The reply's August 2026 identity adoption may be a brand rollout distinct from the July legal change. The preview does not conflate these dates.

## Questions to send to the founder

The user requested that these be collected rather than block design work:

1. Which public business email and telephone number should be published?
2. May we publish both leadership entries: Kamsiriochi David Emmanuel, Founder and Director; and Josh, Senior Developer and Operational Manager? What is Josh's preferred full public name? Are approved portraits available?
3. What is the confirmed Flurzi360 domain, and which features have completed production validation? What is the approved self-service registration destination when ready?
4. Can you supply existing product specifications and current approved screenshots, particularly for Flurzi360, Commit and Cortex? Until then the descriptions remain limited to your reply.
5. Does August 2026 refer to a brand rollout distinct from the legal name change recorded on 13 July 2026?

Leadership and public contact details are omitted from the preview until confirmed. Additional product assets are useful but do not block layout review.

## Next implementation stage, after design approval

Adapt the existing Next.js components and central content data to the approved design. Preserve working routes, keyboard behaviours and original logo. Add full product pages for all seven platforms, a corporate innovation page and a partnerships page. Retain/review the four legal pages and FAQs. Plan legacy SponsorSafe and Projects redirects without guessing external domains. Use explicit status fields consistently in page copy, metadata, navigation and FAQs. Legal content and backend enquiry delivery need their own review; neither is represented as completed here.
