/** Media is kept separate so supplied footage can replace previews without layout changes. */
export const HERO_MEDIA: { video?: string; poster?: string } = {};
export const PRODUCT_MEDIA: Record<string, { image: string; video?: string }> = {
  flurzi360: { image: "/media/flurzi360-brand.webp" },
  commit: { image: "/media/commit.webp" },
  cinema: { image: "/media/cinema.webp" },
  endnovel: { image: "/media/endnovel.webp" },
};
