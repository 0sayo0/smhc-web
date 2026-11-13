import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { MediaReveal } from "@/components/motion/MediaReveal";

import { Container } from "@/components/layout/Container";

import { CategoryCard } from "@/components/catalog/CategoryCard";

import { ProductCard } from "@/components/catalog/ProductCard";

import { getCategoryPageData, getCategoryPaths } from "@/lib/catalog";

import { urlFor } from "@/lib/sanity";

// ========================================
// TYPES
// ========================================

interface CategoryPageProps {
  params: Promise<{
    segments: string[];
  }>;
}

// ========================================
// STATIC PARAMS
// ========================================

export async function generateStaticParams() {
  return getCategoryPaths();
}

// ========================================
// METADATA
// ========================================

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { segments } = await params;

  if (segments.length < 1 || segments.length > 2) {
    return {
      title: "Categoría no encontrada",
      robots: {
        index: false,
      },
    };
  }

  const data = await getCategoryPageData(segments[0], segments[1]);

  if (!data) {
    return {
      title: "Categoría no encontrada",
      robots: {
        index: false,
      },
    };
  }

  const { category } = data;

  const canonical = `/catalogo/${segments.join("/")}`;

  const description =
    category.description ||
    `Descubre ${category.name}, piezas artesanales de Stephany Manzano Home Collection.`;

  return {
    title: category.name,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${category.name} | Stephany Manzano`,
      description,
      url: canonical,
    },
  };
}

// ========================================
// CATEGORY PAGE
// ========================================

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { segments } = await params;

  // Only root and first-level subcategories
  // are supported in this phase.

  if (segments.length < 1 || segments.length > 2) {
    notFound();
  }

  const data = await getCategoryPageData(segments[0], segments[1]);

  if (!data) {
    notFound();
  }

  const { category, subcategories, products } = data;

  const isSubcategory = Boolean(category.parent);

  const hasCoverImage = Boolean(category.coverImage?.asset);

  return (
    <main
      className="
        min-h-screen
        bg-cream

        pt-32
        pb-32

        lg:pt-44
      "
    >
      {/* =====================================
          CATEGORY HEADER
         ===================================== */}

      <section>
        <Container>
          {/* BREADCRUMBS */}

          <nav
            aria-label="Ruta de navegación"
            className="
              mb-12

              flex
              flex-wrap
              items-center
              gap-3

              font-system
              text-[10px]
              uppercase
              tracking-[0.15em]

              text-coal/60
            "
          >
            <Link
              href="/catalogo"
              className="
                transition-colors
                hover:text-terracotta
              "
            >
              Catálogo
            </Link>

            {isSubcategory && category.parent && (
              <>
                <span aria-hidden="true">/</span>

                <Link
                  href={`/catalogo/${category.parent.slug}`}
                  className="
                      transition-colors
                      hover:text-terracotta
                    "
                >
                  {category.parent.name}
                </Link>
              </>
            )}

            <span aria-hidden="true">/</span>

            <span aria-current="page" className="text-coal">
              {category.name}
            </span>
          </nav>

          {/* EDITORIAL HEADING */}

          <div
            className="
              grid
              grid-cols-1
              gap-12

              lg:grid-cols-2
              lg:items-center
              lg:gap-20
            "
          >
            <FadeIn direction="left" duration={0.8}>
              <div
                className="
                flex
                flex-col
                items-start
              "
              >
                <span
                  className="
                  font-system
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]

                  text-terracotta
                "
                >
                  {isSubcategory ? "Universo artesanal" : "Colección de hogar"}
                </span>

                <h1
                  className="
                  mt-7

                  font-brand
                  text-[clamp(2.8rem,5vw,5.8rem)]

                  leading-[1.12]
                  tracking-[-0.04em]

                  text-coal
                  text-balance
                "
                >
                  {category.name}
                </h1>

                <div
                  aria-hidden="true"
                  className="
                  mt-8
                  h-px
                  w-14
                  bg-terracotta
                "
                />

                {category.description && (
                  <p
                    className="
                    mt-8

                    max-w-lg

                    font-editorial
                    text-base
                    md:text-lg

                    leading-8

                    text-coal/70
                  "
                  >
                    {category.description}
                  </p>
                )}

                <Link
                  href="/catalogo"
                  className="
                  group

                  mt-10

                  inline-flex
                  items-center
                  gap-3

                  border-b
                  border-coal/30

                  pb-2

                  font-system
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]

                  text-coal

                  transition-colors
                  hover:text-terracotta
                "
                >
                  <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
                  Explorar catálogo
                </Link>
              </div>
            </FadeIn>

            {/* CATEGORY IMAGE */}

            {hasCoverImage && category.coverImage && (
              <MediaReveal
                className="
                    relative
                    aspect-5/4

                    overflow-hidden
                    bg-warm
                  "
              >
                <Image
                  src={urlFor(category.coverImage)
                    .width(1400)
                    .quality(85)
                    .auto("format")
                    .url()}
                  alt={category.coverImage.alt || category.name}
                  fill
                  sizes="
                      (max-width: 1023px) 100vw,
                      50vw
                    "
                  className="object-cover"
                />
              </MediaReveal>
            )}
          </div>
        </Container>
      </section>

      {/* =====================================
          SUBCATEGORIES
         ===================================== */}

      {subcategories.length > 0 && (
        <section
          className="
            mt-28
            lg:mt-36
          "
        >
          <Container>
            <div
              className="
                mb-14

                border-t
                border-coal/15

                pt-10
              "
            >
              <span
                className="
                  font-system
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]

                  text-terracotta
                "
              >
                Explorar por tipo
              </span>

              <h2
                className="
                  mt-5

                  font-brand
                  text-3xl
                  md:text-4xl

                  text-coal
                "
              >
                Descubre nuestras piezas
              </h2>
            </div>

            <div
              className="
                grid
                grid-cols-1

                gap-x-8
                gap-y-16

                md:grid-cols-2

                xl:grid-cols-3
              "
            >
              {subcategories.map((subcategory, index) => (
                <CategoryCard
                  key={subcategory._id}
                  category={subcategory}
                  index={index}
                  href={`/catalogo/${category.slug}/${subcategory.slug}`}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* =====================================
          PRODUCTS
         ===================================== */}

      <section
        className="
          mt-28
          lg:mt-36
        "
      >
        <Container>
          <div
            className="
              mb-14

              flex
              flex-col

              gap-5

              border-t
              border-coal/15

              pt-10

              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div>
              <span
                className="
                  font-system
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]

                  text-terracotta
                "
              >
                Selección artesanal
              </span>

              <h2
                className="
                  mt-5

                  font-brand
                  text-3xl
                  md:text-4xl

                  text-coal
                "
              >
                Nuestras piezas
              </h2>
            </div>

            {products.length > 0 && (
              <span
                className="
                  font-editorial
                  text-sm
                  italic

                  text-coal/60
                "
              >
                {products.length} {products.length === 1 ? "pieza" : "piezas"}
              </span>
            )}
          </div>

          {products.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1

                gap-x-8
                gap-y-16

                sm:grid-cols-2

                lg:grid-cols-3
              "
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div
              className="
                max-w-2xl

                bg-warm

                px-8
                py-16

                text-center

                md:px-14
              "
            >
              <span
                className="
                  font-system
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]

                  text-terracotta
                "
              >
                Próximamente
              </span>

              <p
                className="
                  mt-6

                  font-editorial
                  text-lg
                  italic
                  leading-8

                  text-coal/70
                "
              >
                Estamos preparando nuevas piezas para compartir contigo. Muy
                pronto descubrirás más de nuestro universo artesanal.
              </p>

              <Link
                href="/contacto"
                className="
                  mt-9

                  inline-block

                  border-b
                  border-coal/40

                  pb-2

                  font-system
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]

                  text-coal

                  transition-colors
                  hover:text-terracotta
                "
              >
                Contactar a SMHC
              </Link>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
