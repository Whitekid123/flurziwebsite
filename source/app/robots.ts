import type {MetadataRoute} from "next";
export default function robots(): MetadataRoute.Robots {
  const preview = process.env.VERCEL_ENV === "preview";
  return {rules: preview ? {userAgent: "*", disallow: "/"} : {userAgent: "*", allow: "/", disallow: "/api/"}, sitemap: "https://www.flurzi.com/sitemap.xml"};
}
