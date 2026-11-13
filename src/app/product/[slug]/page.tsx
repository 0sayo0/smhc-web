import type { Metadata } from "next";

import Link from "next/link";

import { PortableText } from "@portabletext/react";

import { notFound } from "next/navigation";

import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/Container";

import {
  ProductGallery,
  type ProductGalleryImage,
} from "@/components/product/ProductGallery";

import {
  getProduct,
  getProductSlugs,
  type ProductCollection,
} from "@/lib/products";

import { getWhatsappUrl } from "@/lib/whatsapp";

import { urlFor } from "@/lib/sanity";

// ========================================
// TYPES
// ========================================

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ========================================
// STATIC PARAMS
// ========================================

export async function generateStaticParams() {
  return getProductSlugs();
}

// ========================================
// METADATA
// ========================================

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Pieza no encontrada",
      robots: {
        index: false,
      },
    };
  }

  const description =
    product.description ||
    product.purpose ||
    `Descubre ${product.name}, una pieza artesanal de Stephany Manzano Home Collection.`;

  const canonical = `/product/${encodeURIComponent(product.slug)}`;

  const imageUrl = product.mainImage?.asset
    ? urlFor(product.mainImage)
        .width(1200)
        .height(630)
        .quality(85)
        .auto("format")
        .url()
    : null;

  return {
    title: product.name,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${product.name} | Stephany Manzano`,

      description,

      url: canonical,

      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.mainImage?.alt || product.name,
            },
          ]
        : undefined,
    },
  };
}

// ========================================
// PRODUCT PAGE
// ========================================

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // ========================================
  // GALLERY DATA
  // ========================================

  const sourceImages = [product.mainImage, ...(product.gallery ?? [])].filter(
    (image): image is NonNullable<typeof image> => Boolean(image?.asset),
  );

  const galleryImages: ProductGalleryImage[] = sourceImages.map(
    (image, index) => ({
      src: urlFor(image).width(1600).quality(85).auto("format").url(),

      thumbnailSrc: urlFor(image).width(240).height(240).fit("crop").url(),

      alt: image.alt?.trim() || `${product.name}, fotografía ${index + 1}`,
    }),
  );

  // ========================================
  // CATEGORY NAVIGATION
  // ========================================

  const category = product.category;

  const categoryHref = category?.slug
    ? category.parent?.slug
      ? `/catalogo/${encodeURIComponent(
          category.parent.slug,
        )}/${encodeURIComponent(category.slug)}`
      : `/catalogo/${encodeURIComponent(category.slug)}`
    : "/catalogo";

  // ========================================
  // COLLECTION RELATIONSHIPS
  // ========================================

  const collectionCandidates = [
    ...(product.collections ?? []),
    product.legacyCollection,
  ];

  const visibleCollections = collectionCandidates.filter(
    (collection): collection is ProductCollection =>
      collection !== null &&
      collection.showOnSite === true &&
      Boolean(collection.slug),
  );

  const uniqueCollections = Array.from(
    new Map(
      visibleCollections.map((collection) => [collection._id, collection]),
    ).values(),
  );

  // ========================================
  // WHATSAPP
  // ========================================

  const defaultMessage = "Hola, me interesa conocer más sobre la pieza";

  const messagePrefix = product.whatsappMessage?.trim() || defaultMessage;

  const whatsappUrl = getWhatsappUrl(
    `${messagePrefix} ${product.name}. ¿Podrían compartirme información y disponibilidad?`,
  );

  // ========================================
  // CONTENT FLAGS
  // ========================================

  const hasStory = Array.isArray(product.story) && product.story.length > 0;

  const hasMaterials =
    Array.isArray(product.material) && product.material.length > 0;

  const hasTechnicalDetails = hasMaterials || Boolean(product.dimensions);

  const availabilityLabel =
    product.inStock === true
      ? "Disponible"
      : product.inStock === false
        ? "No disponible por el momento"
        : "Disponibilidad por confirmar";

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="min-h-screen bg-cream pb-28 pt-32 lg:pt-44">
      <Container>
        {/* =====================================
            BREADCRUMBS
           ===================================== */}

        <nav
          aria-label="Ruta de navegación"
          className="mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 font-system text-[10px] uppercase tracking-[0.14em] text-coal/60"
        >
          <Link
            href="/catalogo"
            className="transition-colors hover:text-terracotta"
          >
            Catálogo
          </Link>

          {category?.parent?.slug && (
            <>
              <span aria-hidden="true">/</span>

              <Link
                href={`/catalogo/${encodeURIComponent(category.parent.slug)}`}
                className="transition-colors hover:text-terracotta"
              >
                {category.parent.name}
              </Link>
            </>
          )}

          {category?.slug && (
            <>
              <span aria-hidden="true">/</span>

              <Link
                href={categoryHref}
                className="transition-colors hover:text-terracotta"
              >
                {category.name}
              </Link>
            </>
          )}

          <span aria-hidden="true">/</span>

          <span aria-current="page" className="text-coal">
            {product.name}
          </span>
        </nav>

        {/* =====================================
            PRODUCT INTRODUCTION
           ===================================== */}

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-20">
          {/* LEFT — EDITORIAL GALLERY */}

          <div className="min-w-0">
            <ProductGallery productName={product.name} images={galleryImages} />
          </div>

          {/* RIGHT — PRODUCT IDENTITY */}

          <div className="flex min-w-0 flex-col lg:pt-6">
            {/* EYEBROW */}

            <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
              Pieza artesanal · SMHC
            </span>

            {/* NAME */}

            <h1 className="mt-7 font-brand text-[clamp(2.5rem,4.5vw,5rem)] leading-[1.12] tracking-[-0.035em] text-coal text-balance">
              {product.name}
            </h1>

            {/* PURPOSE */}

            {product.purpose && (
              <p className="mt-6 max-w-lg font-editorial text-lg italic leading-8 text-coal/65">
                {product.purpose}
              </p>
            )}

            {/* DECORATIVE DIVIDER */}

            <div aria-hidden="true" className="mt-8 h-px w-14 bg-terracotta" />

            {/* DESCRIPTION */}

            {product.description && (
              <p className="mt-8 max-w-xl font-editorial text-base leading-8 text-coal/75 md:text-lg">
                {product.description}
              </p>
            )}

            {/* AVAILABILITY */}

            <div className="mt-10 border-y border-coal/15 py-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    product.inStock === true
                      ? "bg-emerald-700"
                      : "bg-terracotta"
                  }`}
                />

                <span className="font-system text-[10px] font-semibold uppercase tracking-[0.14em] text-coal/75">
                  {availabilityLabel}
                </span>
              </div>
            </div>

            {/* WHATSAPP CTA */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-14 items-center justify-center gap-4 bg-coal px-7 py-5 text-center font-system text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-terracotta"
            >
              <MessageCircle aria-hidden="true" size={19} strokeWidth={1.5} />

              {product.inStock === false
                ? "Consultar disponibilidad"
                : "Consultar esta pieza"}

              <ArrowUpRight
                aria-hidden="true"
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
              />
            </a>

            <p className="mt-4 max-w-lg font-editorial text-sm italic leading-6 text-coal/55">
              Atención personalizada para resolver tus dudas sobre
              disponibilidad, elaboración y detalles de la pieza.
            </p>

            {/* TECHNICAL DETAILS */}

            {hasTechnicalDetails && (
              <section
                aria-labelledby="product-details-title"
                className="mt-14"
              >
                <h2
                  id="product-details-title"
                  className="font-brand text-2xl text-coal"
                >
                  Los detalles
                </h2>

                <dl className="mt-7 border-t border-coal/15">
                  {product.dimensions && (
                    <div className="grid grid-cols-[100px_1fr] gap-5 border-b border-coal/10 py-5 sm:grid-cols-[140px_1fr]">
                      <dt className="font-system text-[10px] font-semibold uppercase tracking-[0.12em] text-coal/55">
                        Dimensiones
                      </dt>

                      <dd className="font-editorial text-sm leading-6 text-coal/80">
                        {product.dimensions}
                      </dd>
                    </div>
                  )}

                  {hasMaterials && (
                    <div className="grid grid-cols-[100px_1fr] gap-5 border-b border-coal/10 py-5 sm:grid-cols-[140px_1fr]">
                      <dt className="font-system text-[10px] font-semibold uppercase tracking-[0.12em] text-coal/55">
                        Materiales
                      </dt>

                      <dd className="font-editorial text-sm leading-6 text-coal/80">
                        {product.material!.join(", ")}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {/* BACK TO CATEGORY */}

            <Link
              href={categoryHref}
              className="group mt-12 inline-flex items-center gap-3 self-start border-b border-coal/30 pb-2 font-system text-[10px] font-semibold uppercase tracking-[0.16em] text-coal transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
              Volver a {category?.name || "catálogo"}
            </Link>
          </div>
        </div>

        {/* =====================================
            PRODUCT STORYTELLING
           ===================================== */}

        {hasStory && product.story && (
          <section
            aria-labelledby="product-story-title"
            className="mx-auto mt-28 max-w-3xl border-t border-coal/15 pt-14 md:mt-36 md:pt-20"
          >
            <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
              Detrás de la creación
            </span>

            <h2
              id="product-story-title"
              className="mt-6 font-brand text-3xl leading-tight text-coal md:text-4xl"
            >
              La historia de la pieza
            </h2>

            <div className="mt-8 font-editorial text-base leading-9 text-coal/75 [&_p]:mb-5 [&_h2]:mb-5 [&_h2]:mt-9 [&_h2]:font-brand [&_h2]:text-2xl [&_strong]:font-semibold [&_a]:text-terracotta [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6">
              <PortableText value={product.story} />
            </div>
          </section>
        )}

        {/* =====================================
            RELATED COLLECTIONS
           ===================================== */}

        {uniqueCollections.length > 0 && (
          <section
            aria-labelledby="product-collections-title"
            className="mt-28 border-t border-coal/15 pt-14 md:mt-36"
          >
            <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
              El universo de la pieza
            </span>

            <h2
              id="product-collections-title"
              className="mt-6 font-brand text-3xl text-coal md:text-4xl"
            >
              Sus colecciones
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {uniqueCollections.map((collection) => (
                <Link
                  key={collection._id}
                  href={`/colecciones/${encodeURIComponent(collection.slug!)}`}
                  className="group flex min-h-36 items-center justify-between gap-6 bg-warm px-8 py-10 transition-colors duration-300 hover:bg-[#eae2d8]"
                >
                  <span className="font-brand text-2xl leading-tight text-coal">
                    {collection.name}
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.5}
                    className="shrink-0 text-coal transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
