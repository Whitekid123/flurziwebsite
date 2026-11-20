/** Server-side delivery configuration; credentials must never enter the client bundle. */
export function contactConfig() {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.CONTACT_FROM || "";
  const to = process.env.CONTACT_TO || "";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const secret = process.env.TURNSTILE_SECRET_KEY || "";
  const origins = (process.env.CONTACT_ALLOWED_ORIGINS || "https://www.flurzi.com,https://flurzi.com").split(",").map(s => s.trim());
  return {apiKey, from, to, siteKey, secret, origins, ready: Boolean(apiKey && from && to && siteKey && secret)};
}
