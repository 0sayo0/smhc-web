import { cache, type ComponentProps } from "react";

import { PortableText } from "@portabletext/react";

import { client } from "@/lib/sanity";

import type { CatalogImage } from "@/lib/catalog";

// ========================================
// TYPES
// ========================================

export interface ProductCategory {
  name: string;
  slug: string;

  parent: {
    name: string;
    slug: string;
  } | null;
}

export interface ProductCollection {
  _id: string;
  name: string;
  slug: string | null;
  showOnSite: boolean | null;
}

export interface ProductDetail {
  _id: string;

  name: string;
  slug: string;

  description: string | null;
  purpose: string | null;

  mainImage: CatalogImage;
  gallery: CatalogImage[] | null;

  category: ProductCategory | null;

  collections: Array<ProductCollection | null> | null;

  legacyCollection: ProductCollection | null;

  material: string[] | null;
  dimensions: string | null;

  story: ComponentProps<typeof PortableText>["value"] | null;

  whatsappMessage: string | null;

  inStock: boolean | null;
}

// ========================================
// PRODUCT DETAIL
// ========================================

export const getProduct = cache(
  async (slug: string): Promise<ProductDetail | null> => {
    const query = `
      *[
        _type == "product" &&
        slug.current == $slug
      ][0] {

        _id,
        name,

        "slug": slug.current,

        description,
        purpose,

        mainImage,
        gallery,

        "category": category-> {
          name,
          "slug": slug.current,

          "parent": parent-> {
            name,
            "slug": slug.current
          }
        },

        "collections": collections[]-> {
          _id,
          name,
          "slug": slug.current,
          showOnSite
        },

        "legacyCollection": collection-> {
          _id,
          name,
          "slug": slug.current,
          showOnSite
        },

        material,
        dimensions,

        story,

        whatsappMessage,
        inStock
      }
    `;

    return client.fetch<ProductDetail | null>(
      query,
      { slug },
      {
        next: {
          revalidate: 60,
        },
      },
    );
  },
);

// ========================================
// STATIC PRODUCT PATHS
// ========================================

export async function getProductSlugs(): Promise<Array<{ slug: string }>> {
  const query = `
    *[
      _type == "product" &&
      defined(slug.current)
    ] {
      "slug": slug.current
    }
  `;

  return client.fetch<Array<{ slug: string }>>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    },
  );
}
