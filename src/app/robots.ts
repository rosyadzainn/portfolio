import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://rosyadzain.com/sitemap.xml",
    host: "https://rosyadzain.com",
  };
}
