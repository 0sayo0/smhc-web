import { cache } from "react";

import type { SanityImageObject } from "@sanity/image-url";

import { client } from "@/lib/sanity";

// ========================================
// TYPES
// ========================================

export type CatalogImage =
  | (SanityImageObject & {
      alt?: string;
    })
  | null;

export interface CatalogCategory {
  _id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: CatalogImage;
}

export interface CatalogCategoryDetail extends CatalogCategory {
  parent: {
    name: string;
    slug: string;
  } | null;
}

export interface CatalogProduct {
  _id: string;
  name: string;
  slug: string;

  description: string | null;
  purpose: string | null;

  mainImage: CatalogImage;

  collectionName: string | null;
  categoryName: string | null;
}

export interface CatalogPageData {
  category: CatalogCategoryDetail;
  subcategories: CatalogCategory[];
  products: CatalogProduct[];
}

// ========================================
// SHARED GROQ PROJECTIONS
// ========================================

const categoryFields = `
  _id,
  name,
  "slug": slug.current,
  description,
  coverImage
`;

export const catalogProductProjection = `
  _id,
  name,
  "slug": slug.current,
  description,
  purpose,
  mainImage,

  "collectionName": coalesce(
    collections[0]->name,
    collection->name
  ),

  "categoryName": category->name
`;

// ========================================
// ROOT CATEGORIES
// ========================================

export async function getRootCategories(): Promise<CatalogCategory[]> {
  const query = `
    *[
      _type == "category" &&
      !defined(parent._ref) &&
      defined(slug.current)
    ]
    | order(
      coalesce(navigationOrder, 100) asc,
      name asc
    ) {
      ${categoryFields}
    }
  `;

  return client.fetch<CatalogCategory[]>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    },
  );
}

// ========================================
// CATEGORY PAGE DATA
// ========================================

export const getCategoryPageData = cache(
  async (
    rootSlug: string,
    childSlug?: string,
  ): Promise<CatalogPageData | null> => {
    // ------------------------------------
    // IDENTIFY CATEGORY LEVEL
    // ------------------------------------

    const isSubcategory = Boolean(childSlug);

    const categoryFilter = isSubcategory
      ? `
        slug.current == $childSlug &&
        parent->slug.current == $rootSlug &&
        !defined(parent->parent._ref)
      `
      : `
        slug.current == $rootSlug &&
        !defined(parent._ref)
      `;

    // ------------------------------------
    // FETCH CATEGORY
    // ------------------------------------

    const categoryQuery = `
      *[
        _type == "category" &&
        ${categoryFilter}
      ][0] {
        ${categoryFields},

        "parent": parent->{
          name,
          "slug": slug.current
        }
      }
    `;

    const category = await client.fetch<CatalogCategoryDetail | null>(
      categoryQuery,
      {
        rootSlug,
        childSlug: childSlug ?? "",
      },
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!category) {
      return null;
    }

    // ------------------------------------
    // FETCH SUBCATEGORIES
    // ------------------------------------

    const subcategoriesQuery = `
      *[
        _type == "category" &&
        parent._ref == $categoryId &&
        defined(slug.current)
      ]
      | order(
        coalesce(navigationOrder, 100) asc,
        name asc
      ) {
        ${categoryFields}
      }
    `;

    // ------------------------------------
    // FETCH PRODUCTS
    // ------------------------------------

    const productFilter = isSubcategory
      ? `
        category._ref == $categoryId
      `
      : `
        (
          category._ref == $categoryId ||
          category->parent._ref == $categoryId
        )
      `;

    const productsQuery = `
      *[
        _type == "product" &&
        defined(slug.current) &&
        ${productFilter}
      ]
      | order(name asc) {
        ${catalogProductProjection}
      }
    `;

    const [subcategories, products] = await Promise.all([
      isSubcategory
        ? Promise.resolve<CatalogCategory[]>([])
        : client.fetch<CatalogCategory[]>(
            subcategoriesQuery,
            {
              categoryId: category._id,
            },
            {
              next: {
                revalidate: 60,
              },
            },
          ),

      client.fetch<CatalogProduct[]>(
        productsQuery,
        {
          categoryId: category._id,
        },
        {
          next: {
            revalidate: 60,
          },
        },
      ),
    ]);

    return {
      category,
      subcategories,
      products,
    };
  },
);

// ========================================
// STATIC CATEGORY PATHS
// ========================================

interface CategoryPathRecord {
  slug: string;

  parentRef: string | null;

  parentSlug: string | null;

  grandparentRef: string | null;
}

export async function getCategoryPaths(): Promise<
  Array<{ segments: string[] }>
> {
  const query = `
    *[
      _type == "category" &&
      defined(slug.current)
    ] {
      "slug": slug.current,

      "parentRef": parent._ref,

      "parentSlug": parent->slug.current,

      "grandparentRef": parent->parent._ref
    }
  `;

  const categories = await client.fetch<CategoryPathRecord[]>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    },
  );

  return categories.flatMap((category) => {
    // Categoría principal.
    if (!category.parentRef) {
      return [
        {
          segments: [category.slug],
        },
      ];
    }

    // Subcategoría válida de primer nivel.
    if (category.parentRef && category.parentSlug && !category.grandparentRef) {
      return [
        {
          segments: [category.parentSlug, category.slug],
        },
      ];
    }

    // Referencias incompletas o niveles no soportados.
    return [];
  });
}
