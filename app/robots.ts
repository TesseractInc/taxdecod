import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/auth/",
        "/account/",
        "/dashboard/",
        "/admin/",
        "/preview/",
        "/_vercel/",
        "/*?*",
      ],
    },
    sitemap: "https://www.taxdecod.com/sitemap.xml",
  };
}