export const COMPANY = {
  name: "Flurzi Limited",
  short: "Flurzi",
  email: "hello@flurzimobileapp.co.uk",
  phone: "+44 024 7510 7676",
  phoneHref: "tel:+4402475107676",
};

export const demoHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
  "Book a demo with Flurzi"
)}`;

export type Product = {
  id: string;
  index: string;
  name: string;
  category: string;
  world: string;
  tagline: string;
  description: string;
  features: string[];
  accent: string;
  accentSoft: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sponsorsafe",
    index: "01",
    name: "SponsorSafe HR",
    category: "Compliance software",
    world: "Work",
    tagline: "Sponsor licence compliance, kept in order.",
    description:
      "Compliance workflows for UK sponsor licence holders. Keep sponsored worker records, right to work evidence and visa dates in one place, and be ready when an audit comes.",
    features: [
      "Sponsor licence records",
      "Right to work evidence",
      "Visa expiry alerts",
      "Audit evidence packs",
    ],
    accent: "#34D3A6",
    accentSoft: "rgba(52, 211, 166, 0.16)",
  },
  {
    id: "commit",
    index: "02",
    name: "Flurzi Commit",
    category: "Commitment plans",
    world: "Commitments",
    tagline: "Commit today. Thank yourself tomorrow.",
    description:
      "Fixed-term plans that help people follow through. Clear billing controls, visible progress towards maturity and payout tracking from start to finish.",
    features: [
      "Fixed-term plans",
      "Billing controls",
      "Maturity progress",
      "Payout tracking",
    ],
    accent: "#F2B544",
    accentSoft: "rgba(242, 181, 68, 0.16)",
  },
  {
    id: "cinema",
    index: "03",
    name: "FlurziCinema",
    category: "Streaming & entertainment",
    world: "Entertainment",
    tagline: "Movies, series and reels in one screen.",
    description:
      "A streaming home for movies, series and short reels, with discovery that surfaces what to watch next, continue watching across sessions and live viewing.",
    features: [
      "Movies, series & reels",
      "Discovery",
      "Continue watching",
      "Live viewing",
    ],
    accent: "#FF4D6A",
    accentSoft: "rgba(255, 77, 106, 0.16)",
  },
  {
    id: "endnovel",
    index: "04",
    name: "End Novel",
    category: "Stories & reading",
    world: "Reading",
    tagline: "Find a story. Stay for the ending.",
    description:
      "Free story discovery with saved libraries, rankings and reading progress that follows you, plus supported episode unlocks for the stories you can't put down.",
    features: [
      "Free story discovery",
      "Saved libraries",
      "Rankings",
      "Reading progress & episode unlocks",
    ],
    accent: "#F3C9A1",
    accentSoft: "rgba(243, 201, 161, 0.16)",
  },
];

export const FUTURE = [
  {
    id: "flurzix",
    name: "FlurziX",
    category: "Marketplace",
    description:
      "A buyer and seller marketplace built for trusted, straightforward trading. An ongoing project in active development.",
    points: ["Buyers & sellers", "Listings & offers", "Ongoing project"],
    accent: "#3D8BFF",
  },
  {
    id: "playvault",
    name: "PlayVault",
    category: "Game hub",
    description:
      "A home for players: game discovery, player profiles and a personal library, brought together in one hub.",
    points: ["Game discovery", "Player profiles", "Personal library"],
    accent: "#7357FF",
  },
];

export const CAPABILITIES = [
  {
    title: "Product engineering",
    body: "We take products from first idea to dependable release: product thinking, interface design, architecture and the steady work of shipping and improving.",
    items: ["Discovery & scoping", "UX & interface design", "Architecture", "Release & iteration"],
  },
  {
    title: "Mobile & web apps",
    body: "Native-feeling mobile apps and fast, accessible web experiences, designed as one system so every screen feels like the same product.",
    items: ["iOS & Android", "Responsive web", "Accounts & payments", "Notifications"],
  },
  {
    title: "Compliance software",
    body: "Software for regulated work, where records, evidence and deadlines matter. Built so the right information is there when it is needed.",
    items: ["Record keeping", "Evidence management", "Deadline alerts", "Audit readiness"],
  },
  {
    title: "Streaming & content platforms",
    body: "Platforms for watching and reading: catalogues, discovery, progress that follows the user and the controls that keep content flowing.",
    items: ["Video & live", "Stories & episodes", "Discovery & rankings", "Progress sync"],
  },
];

export const PRINCIPLES = [
  {
    title: "Useful first",
    body: "Every product starts with a real job someone needs done. Design serves that job, never the other way round.",
  },
  {
    title: "Trust is a feature",
    body: "Clear records, honest pricing and predictable behaviour. People should always know where they stand.",
  },
  {
    title: "Built to keep improving",
    body: "We ship, listen and refine. A product is never finished while the people using it still have ideas.",
  },
];

export const NAV_LINKS = [
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#products", label: "Products" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];
