import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft } from "lucide-react";

import { MediaReveal } from "@/components/motion/MediaReveal";

import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/catalog/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";

import {
  getCollectionPageData,
  getVisibleCollectionSlugs,
} from "@/lib/collections";

import { urlFor } from "@/lib/sanity";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

// ========================================
// STATIC PARAMS
// ========================================

export async function generateStaticParams() {
  const slugs = await getVisibleCollectionSlugs();

  return slugs.map((slug) => ({ slug }));
}

// ========================================
// METADATA
// ========================================

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCollectionPageData(slug);

  if (!data) {
    return {
      title: "Colección no encontrada",
      robots: { index: false },
    };
  }

  const { collection } = data;

  const description =
    collection.description ||
    `Explora ${collection.name}, una colección editorial de Stephany Manzano Home Collection.`;

  const canonical = `/colecciones/${collection.slug}`;

  return {
    title: collection.name,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${collection.name} | Stephany Manzano`,
      description,
      url: canonical,
    },
  };
}

// ========================================
// PAGE
// ========================================

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const data = await getCollectionPageData(slug);

  if (!data) {
    notFound();
  }

  const { collection, products } = data;

  const hasImage = Boolean(collection.coverImage?.asset);

  const label =
    collection.eyebrow ||
    (collection.kind === "seasonal"
      ? "Edición de temporada"
      : "Colección editorial");

  const hasStory =
    Array.isArray(collection.story) && collection.story.length > 0;

  return (
    <main className="min-h-screen bg-cream pb-32 pt-32 lg:pt-44">
      {/* HERO EDITORIAL */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-360 overflow-hidden bg-warm lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center px-8 py-14 sm:px-12 lg:px-14 lg:py-20 xl:px-20">
            <FadeIn>
              <nav
                aria-label="Ruta de navegación"
                className="mb-14 flex flex-wrap items-center gap-3 font-system text-[10px] uppercase tracking-[0.15em] text-coal/60"
              >
                <Link
                  href="/colecciones"
                  className="transition-colors hover:text-terracotta"
                >
                  Colecciones
                </Link>

                <span aria-hidden="true">/</span>

                <span aria-current="page" className="text-coal">
                  {collection.name}
                </span>
              </nav>

              <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
                {label}
              </span>

              <h1 className="mt-7 font-brand text-[clamp(2.7rem,4.5vw,5.5rem)] leading-[1.1] tracking-[-0.04em] text-coal text-balance">
                {collection.name}
              </h1>

              <div
                aria-hidden="true"
                className="mt-9 h-px w-14 bg-terracotta"
              />

              {collection.description && (
                <p className="mt-9 max-w-lg font-editorial text-base leading-8 text-coal/75 md:text-lg">
                  {collection.description}
                </p>
              )}

              {products.length > 0 && (
                <Link
                  href="#piezas"
                  className="group mt-12 inline-flex items-center gap-4 self-start border-b border-coal/35 pb-3 font-system text-[10px] font-semibold uppercase tracking-[0.18em] text-coal transition-colors hover:text-terracotta"
                >
                  Descubrir las piezas
                  <ArrowDown
                    aria-hidden="true"
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 motion-safe:group-hover:translate-y-1"
                  />
                </Link>
              )}
            </FadeIn>
          </div>

          <MediaReveal
            delay={0.12}
            duration={1.05}
            className="relative min-h-100 overflow-hidden bg-coal/10 sm:min-h-137.5 lg:min-h-162.5"
          >
            {hasImage && collection.coverImage ? (
              <Image
                src={urlFor(collection.coverImage)
                  .width(1600)
                  .quality(85)
                  .auto("format")
                  .url()}
                alt={collection.coverImage.alt || collection.name}
                fill
                sizes="(max-width: 1023px) 100vw, 55vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EAE3D9] px-10 text-center">
                <span className="font-editorial text-sm italic text-terracotta">
                  Stephany Manzano
                </span>

                <span className="mt-8 font-brand text-4xl leading-tight text-coal sm:text-5xl">
                  El arte de lo hecho a mano.
                </span>

                <span
                  aria-hidden="true"
                  className="mt-10 h-px w-16 bg-terracotta"
                />
              </div>
            )}
          </MediaReveal>
        </div>
      </section>

      {/* HISTORIA EDITORIAL */}
      {hasStory && collection.story && (
        <section className="py-24 md:py-32">
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-3xl">
                <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
                  La inspiración
                </span>

                <h2 className="mt-6 font-brand text-3xl text-coal md:text-4xl">
                  Detrás de la colección
                </h2>

                <div className="mt-9 font-editorial text-base leading-9 text-coal/75 [&_h2]:mt-8 [&_h2]:font-brand [&_h2]:text-2xl [&_p]:mb-5">
                  <PortableText value={collection.story} />
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* PIEZAS DE LA COLECCIÓN */}
      <section
        id="piezas"
        aria-labelledby="collection-products-title"
        className={`scroll-mt-28 ${hasStory ? "pb-8" : "pt-28 pb-8"}`}
      >
        <Container>
          <div className="mb-14 flex flex-col gap-4 border-t border-coal/15 pt-10 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-system text-[10px] font-semibold uppercase tracking-[0.23em] text-terracotta">
                Selección de la colección
              </span>

              <h2
                id="collection-products-title"
                className="mt-5 font-brand text-3xl text-coal md:text-4xl"
              >
                Las piezas
              </h2>
            </div>

            {products.length > 0 && (
              <span className="font-editorial text-sm italic text-coal/60">
                {products.length} {products.length === 1 ? "pieza" : "piezas"}
              </span>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="max-w-xl font-editorial text-lg italic leading-8 text-coal/65">
              Las piezas de esta colección se encuentran en preparación.
            </p>
          )}

          <Link
            href="/colecciones"
            className="mt-20 inline-flex items-center gap-3 border-b border-coal/30 pb-2 font-system text-[10px] font-semibold uppercase tracking-[0.18em] text-coal transition-colors hover:text-terracotta"
          >
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
            Volver a colecciones
          </Link>
        </Container>
      </section>
    </main>
  );
}
