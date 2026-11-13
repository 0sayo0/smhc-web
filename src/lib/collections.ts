import { cache, type ComponentProps } from "react";
import { PortableText } from "@portabletext/react";

import { client } from "@/lib/sanity";

import {
  catalogProductProjection,
  type CatalogImage,
  type CatalogProduct,
} from "@/lib/catalog";

type StoryValue = ComponentProps<typeof PortableText>["value"];

export interface EditorialCollection {
  _id: string;
  name: string;
  slug: string;

  kind: "permanent" | "seasonal";

  eyebrow: string | null;
  description: string | null;

  story: StoryValue | null;
  coverImage: CatalogImage;
}

export interface CollectionPageData {
  collection: EditorialCollection;
  products: CatalogProduct[];
}

const collectionProjection = `
  _id,
  name,
  "slug": slug.current,
  "kind": coalesce(kind, "permanent"),
  eyebrow,
  description,
  story,
  coverImage
`;

const visibleCollectionsFilter = `
  _type == "collection" &&
  showOnSite == true &&
  defined(slug.current)
`;

// ========================================
// LISTADO DE COLECCIONES
// ========================================

export async function getVisibleCollections(): Promise<EditorialCollection[]> {
  const query = `
    *[${visibleCollectionsFilter}]
    | order(
      coalesce(displayOrder, 100) asc,
      name asc
    ) {
      ${collectionProjection}
    }
  `;

  return client.fetch<EditorialCollection[]>(
    query,
    {},
    { next: { revalidate: 60 } },
  );
}

// ========================================
// RUTAS CONOCIDAS
// ========================================

export async function getVisibleCollectionSlugs(): Promise<string[]> {
  const query = `
    *[${visibleCollectionsFilter}].slug.current
  `;

  return client.fetch<string[]>(query, {}, { next: { revalidate: 60 } });
}

// ========================================
// COLECCIÓN INDIVIDUAL
// ========================================

export const getCollectionPageData = cache(
  async (slug: string): Promise<CollectionPageData | null> => {
    const collectionQuery = `
      *[
        ${visibleCollectionsFilter} &&
        slug.current == $slug
      ][0] {
        ${collectionProjection}
      }
    `;

    const collection = await client.fetch<EditorialCollection | null>(
      collectionQuery,
      { slug },
      { next: { revalidate: 60 } },
    );

    if (!collection) {
      return null;
    }

    const productsQuery = `
      *[
        _type == "product" &&
        defined(slug.current) &&
        references($collectionId)
      ]
      | order(name asc) {
        ${catalogProductProjection}
      }
    `;

    const products = await client.fetch<CatalogProduct[]>(
      productsQuery,
      { collectionId: collection._id },
      { next: { revalidate: 60 } },
    );

    return {
      collection,
      products,
    };
  },
);
