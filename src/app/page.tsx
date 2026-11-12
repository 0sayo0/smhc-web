import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { client } from "@/lib/sanity";

import {
  getRootCategories,
  catalogProductProjection,
  type CatalogProduct,
} from "@/lib/catalog";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Carousel } from "@/components/ui/Carousel";

import { ProductCard } from "@/components/catalog/ProductCard";

import {
  SeasonalHero,
  type SeasonalCampaign,
} from "@/components/home/SeasonalHero";

import {
  FeaturedCollection,
  type FeaturedCollectionConfig,
} from "@/components/home/FeaturedCollection";

import { ExploreMaterials } from "@/components/home/ExploreMaterials";

// ========================================
// TYPES
// ========================================

interface HomeCarousel {
  _key?: string;

  categoryName: string | null;
  categorySlug: string | null;

  selectedProducts: Array<CatalogProduct | null> | null;
}

interface HomeData {
  seasonalCampaign?: SeasonalCampaign | null;

  featuredCollection?: FeaturedCollectionConfig | null;

  carousels?: HomeCarousel[] | null;
}

// ========================================
// HOME DATA
// ========================================

async function getHomeData(): Promise<HomeData | null> {
  const query = `
    *[_type == "homeCurator"][0] {

      seasonalCampaign {
        enabled,
        eyebrow,
        headline,
        description,
        ctaLabel,
        ctaHref,

        image {
          asset,
          alt
        }
      },

      featuredCollection {
        enabled,

        "collection": collection-> {
          _id,
          name,
          "slug": slug.current,
          kind,
          eyebrow,
          description,
          coverImage,
          showOnSite
        }
      },

      carousels[] {
        _key,

        "categoryName": category->name,
        "categorySlug": category->slug.current,

        selectedProducts[]-> {
          ${catalogProductProjection}
        }
      }
    }
  `;

  return client.fetch<HomeData | null>(
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
// HOME PAGE
// ========================================

export default async function Home() {
  const [homeData, categories] = await Promise.all([
    getHomeData(),
    getRootCategories(),
  ]);

  // Prepare only valid, non-empty showcases.
  const carousels = (homeData?.carousels ?? []).flatMap((carousel) => {
    if (!carousel.categoryName || !carousel.categorySlug) {
      return [];
    }

    const products = (carousel.selectedProducts ?? []).filter(
      (product): product is CatalogProduct =>
        Boolean(product?._id && product?.name && product?.slug),
    );

    if (products.length === 0) {
      return [];
    }

    return [
      {
        key: carousel._key || carousel.categorySlug,
        categoryName: carousel.categoryName,
        categorySlug: carousel.categorySlug,
        products,
      },
    ];
  });

  return (
    <main className="min-h-screen bg-cream pb-16 selection:bg-terracotta selection:text-white">
      {/* =====================================
          01 — MAIN EDITORIAL HERO
         ===================================== */}

      <SeasonalHero campaign={homeData?.seasonalCampaign} />

      {/* =====================================
          02 — BRAND MANIFESTO
         ===================================== */}

      <section
        aria-labelledby="home-manifesto-title"
        className="px-6 py-24 text-center md:py-32"
      >
        <Container>
          <FadeIn>
            <span className="font-system text-[10px] font-semibold uppercase tracking-[0.28em] text-terracotta">
              Nuestra esencia
            </span>

            <h2
              id="home-manifesto-title"
              className="mx-auto mt-8 max-w-3xl font-brand text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.2] tracking-[-0.025em] text-coal text-balance"
            >
              El arte de crear
              <br className="hidden sm:block" /> con intención.
            </h2>

            <div
              aria-hidden="true"
              className="mx-auto mt-8 h-px w-12 bg-terracotta"
            />

            <p className="mx-auto mt-8 max-w-2xl font-editorial text-base leading-8 text-coal/70 md:text-lg md:leading-9">
              Cada pieza nace del encuentro entre la creatividad, los materiales
              y el trabajo artesanal. Una invitación a descubrir belleza en las
              formas, las texturas y los pequeños detalles de la vida cotidiana.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* =====================================
          03 — FEATURED EDITORIAL COLLECTION
         ===================================== */}

      <FeaturedCollection config={homeData?.featuredCollection} />

      {/* =====================================
          04 — EXPLORE MATERIAL UNIVERSES
         ===================================== */}

      <div id="piezas" className="scroll-mt-28">
        <ExploreMaterials categories={categories} />
      </div>

      {/* =====================================
          05 — CURATED PRODUCT SHOWCASES
         ===================================== */}

      {carousels.map((carousel, index) => (
        <section
          key={`${carousel.key}-${index}`}
          aria-labelledby={`showcase-title-${index}`}
          className="py-16 md:py-24"
        >
          <Container>
            <FadeIn>
              <div className="mb-14 flex flex-col gap-6 border-t border-coal/15 pt-10 md:flex-row md:items-end md:justify-between">
                {/* SHOWCASE HEADING */}

                <div>
                  <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
                    Selección de SMHC
                  </span>

                  <h2
                    id={`showcase-title-${index}`}
                    className="mt-5 font-brand text-3xl leading-tight text-coal md:text-4xl"
                  >
                    {carousel.categoryName}
                  </h2>
                </div>

                {/* CATEGORY LINK */}

                <Link
                  href={`/catalogo/${encodeURIComponent(
                    carousel.categorySlug,
                  )}`}
                  className="group inline-flex items-center gap-3 self-start border-b border-coal/30 pb-2 font-system text-[10px] font-semibold uppercase tracking-[0.16em] text-coal transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
                >
                  Explorar categoría
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </FadeIn>
          </Container>

          {/* PRODUCT PRESENTATION */}

          {carousel.products.length <= 2 ? (
            <Container>
              <div className="grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
                {carousel.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </Container>
          ) : (
            <Carousel>
              {carousel.products.map((product) => (
                <div
                  key={product._id}
                  className="w-[78vw] shrink-0 snap-start sm:w-[45vw] lg:w-[27vw] xl:w-[22rem]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </Carousel>
          )}
        </section>
      ))}

      {/* =====================================
          06 — EDITORIAL CONTACT CTA
         ===================================== */}

      <section
        aria-labelledby="home-contact-title"
        className="px-6 py-20 md:py-28"
      >
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl border-y border-coal/15 py-16 text-center md:py-20">
              <span className="font-system text-[10px] font-semibold uppercase tracking-[0.28em] text-terracotta">
                Hablemos
              </span>

              <h2
                id="home-contact-title"
                className="mx-auto mt-7 max-w-2xl font-brand text-[clamp(2rem,3.8vw,3.8rem)] leading-[1.2] text-coal text-balance"
              >
                Hay piezas que hacen especial un espacio.
              </h2>

              <p className="mx-auto mt-7 max-w-xl font-editorial text-base leading-8 text-coal/70 md:text-lg">
                ¿Tienes una pregunta sobre nuestras creaciones? Nos encantará
                conocerla.
              </p>

              <Link
                href="/contacto"
                className="group mt-10 inline-flex min-h-13 items-center justify-center gap-5 bg-coal px-8 py-4 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-cream transition-colors duration-300 hover:bg-terracotta"
              >
                Contactar a SMHC
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </main>
  );
}
