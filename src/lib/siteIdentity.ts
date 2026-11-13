import { cache, type ComponentProps } from "react";

import { PortableText } from "@portabletext/react";

import { client } from "@/lib/sanity";

import type { CatalogImage } from "@/lib/catalog";

// ========================================
// TYPES
// ========================================

export interface SiteIdentity {
  aboutTitle: string | null;

  aboutLead: string | null;

  aboutStory: ComponentProps<typeof PortableText>["value"] | null;

  aboutPortrait: CatalogImage;

  processImage: CatalogImage;

  closingStatement: string | null;

  contactIntro: string | null;

  instagramUrl: string | null;
}

// ========================================
// FETCH
// ========================================

export const getSiteIdentity = cache(async (): Promise<SiteIdentity | null> => {
  const query = `
      *[
        _type == "siteIdentity" &&
        _id == "site-identity"
      ][0] {
        aboutTitle,
        aboutLead,
        aboutStory,
        aboutPortrait,
        processImage,
        closingStatement,
        contactIntro,
        instagramUrl
      }
    `;

  return client.fetch<SiteIdentity | null>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    },
  );
});
