import type { MetadataRoute } from "next";

import { SITE_URL, isPublicDeployment } from "@/lib/site";

// ========================================
// ROBOTS.TXT
// ========================================

export default function robots(): MetadataRoute.Robots {
  // ------------------------------------
  // NON-PRODUCTION ENVIRONMENTS
  // ------------------------------------

  if (!isPublicDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // ------------------------------------
  // PUBLIC PRODUCTION WEBSITE
  // ------------------------------------

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
