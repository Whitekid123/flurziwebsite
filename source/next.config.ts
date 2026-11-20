import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{source: "/:path*", headers: [
      {key: "X-Content-Type-Options", value: "nosniff"},
      {key: "X-Frame-Options", value: "DENY"},
      {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
      {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()"},
      {key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'"},
      ...(process.env.VERCEL_ENV === "production" ? [{key: "Strict-Transport-Security", value: "max-age=31536000"}] : []),
      ...(process.env.VERCEL_ENV === "preview" ? [{key: "X-Robots-Tag", value: "noindex, nofollow"}] : []),
    ]}];
  },
  async redirects() {
    return [{source: "/:path*", has: [{type: "host", value: "flurzi.com"}], destination: "https://www.flurzi.com/:path*", permanent: true}];
  },
};

export default nextConfig;
