import type { MetadataRoute } from "next";

import { getCategoryPaths } from "@/lib/catalog";

import { getVisibleCollectionSlugs } from "@/lib/collections";

import { getProductSlugs } from "@/lib/products";

import { SITE_URL } from "@/lib/site";

// ========================================
// SITEMAP REVALIDATION
// ========================================

export const revalidate = 300;

// ========================================
// SITEMAP
// ========================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ------------------------------------
  // FETCH PUBLIC CONTENT
  // ------------------------------------

  const [categories, collections, products] = await Promise.all([
    getCategoryPaths(),
    getVisibleCollectionSlugs(),
    getProductSlugs(),
  ]);

  // ------------------------------------
  // STATIC ROUTES
  // ------------------------------------

  const staticPaths = [
    "/",
    "/catalogo",
    "/colecciones",
    "/nosotros",
    "/contacto",
  ];

  // ------------------------------------
  // CATEGORY ROUTES
  // ------------------------------------

  const categoryPaths = categories.map(
    ({ segments }) => `/catalogo/${segments.map(encodeURIComponent).join("/")}`,
  );

  // ------------------------------------
  // COLLECTION ROUTES
  // ------------------------------------

  const collectionPaths = collections.map(
    (slug) => `/colecciones/${encodeURIComponent(slug)}`,
  );

  // ------------------------------------
  // PRODUCT ROUTES
  // ------------------------------------

  const productPaths = products.map(
    ({ slug }) => `/product/${encodeURIComponent(slug)}`,
  );

  // ------------------------------------
  // COMBINE AND DEDUPLICATE
  // ------------------------------------

  const paths = [
    ...staticPaths,
    ...categoryPaths,
    ...collectionPaths,
    ...productPaths,
  ];

  const uniquePaths = [...new Set(paths)];

  // ------------------------------------
  // GENERATE SITEMAP ENTRIES
  // ------------------------------------

  return uniquePaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
