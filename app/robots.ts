import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/api/", "/admin/", "/control/"],
    },
    sitemap: "https://shlokvaidya.com/sitemap.xml",
  };
}
