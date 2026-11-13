import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, MoveUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";

import { Container } from "@/components/layout/Container";

import { urlFor } from "@/lib/sanity";

import type { CatalogImage } from "@/lib/catalog";

// ========================================
// TYPES
// ========================================

export interface FeaturedCollectionData {
  _id: string;

  name: string;
  slug: string | null;

  kind: "permanent" | "seasonal" | null;

  eyebrow: string | null;
  description: string | null;

  coverImage: CatalogImage;

  showOnSite: boolean | null;
}

export interface FeaturedCollectionConfig {
  enabled?: boolean | null;

  collection?: FeaturedCollectionData | null;
}

interface FeaturedCollectionProps {
  config?: FeaturedCollectionConfig | null;
}

// ========================================
// COMPONENT
// ========================================

export function FeaturedCollection({ config }: FeaturedCollectionProps) {
  // ----------------------------------------
  // VISIBILITY
  // ----------------------------------------

  if (config?.enabled !== true) {
    return null;
  }

  const collection = config.collection;

  if (!collection || collection.showOnSite !== true || !collection.slug) {
    return null;
  }

  // ----------------------------------------
  // EDITORIAL CONTENT
  // ----------------------------------------

  const hasImage = Boolean(collection.coverImage?.asset);

  const label =
    collection.eyebrow?.trim() ||
    (collection.kind === "seasonal"
      ? "Edición de temporada"
      : "Colección editorial");

  const href = `/colecciones/${encodeURIComponent(collection.slug)}`;

  const imageAlt =
    collection.coverImage?.alt?.trim() ||
    `Colección ${collection.name} de Stephany Manzano`;

  // ========================================
  // RENDER
  // ========================================

  return (
    <section
      id="coleccion-destacada"
      aria-labelledby="featured-collection-title"
      className="
        py-20
        md:py-28
      "
    >
      <Container>
        {/* =====================================
            EDITORIAL SECTION HEADER
           ===================================== */}

        <FadeIn
          direction="up"
          duration={0.7}
          className="
            mb-10

            flex
            flex-col
            items-start
            gap-6

            border-t
            border-coal/15

            pt-8

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-9
                bg-terracotta
              "
            />

            <span
              className="
                font-system
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.22em]

                text-terracotta
              "
            >
              En primer plano
            </span>
          </div>

          <Link
            href="/colecciones"
            className="
              group

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
              tracking-[0.16em]

              text-coal

              transition-colors
              duration-300

              hover:border-terracotta
              hover:text-terracotta
            "
          >
            Ver todas las colecciones
            <MoveUpRight
              aria-hidden="true"
              size={15}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300

                motion-safe:group-hover:-translate-y-0.5
                motion-safe:group-hover:translate-x-0.5
              "
            />
          </Link>
        </FadeIn>

        {/* =====================================
            IMMERSIVE COLLECTION FEATURE
           ===================================== */}

        <FadeIn
          direction="none"
          duration={0.95}
          delay={0.1}
          className={`
            relative
            isolate

            flex
            min-h-127.5

            items-end

            overflow-hidden

            sm:min-h-142.5
            lg:min-h-162.5

            ${hasImage ? "bg-coal" : "bg-warm"}
          `}
        >
          {/* PHOTOGRAPHY */}

          {hasImage && collection.coverImage && (
            <>
              <Image
                src={urlFor(collection.coverImage)
                  .width(2000)
                  .quality(85)
                  .auto("format")
                  .url()}
                alt={imageAlt}
                fill
                sizes="
                  (max-width: 1279px) 100vw,
                  1280px
                "
                className="
                  object-cover
                  object-center

                  transition-transform
                  duration-1000
                  ease-out
                "
              />

              {/* GRADIENT FOR TEXT LEGIBILITY */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-0

                  bg-linear-to-t

                  from-coal/90
                  via-coal/40
                  to-coal/10
                "
              />
            </>
          )}

          {/* =====================================
              EDITORIAL CONTENT
             ===================================== */}

          <div
            className={`
              relative
              z-10

              flex
              w-full

              flex-col
              items-start

              px-7
              pb-10
              pt-24

              sm:px-12
              sm:pb-14

              lg:px-20
              lg:pb-20

              ${hasImage ? "text-cream" : "text-coal"}
            `}
          >
            {/* EYEBROW */}

            <div
              className="
                mb-6

                flex
                items-center
                gap-4
              "
            >
              <span
                aria-hidden="true"
                className={`
                  h-px
                  w-8

                  ${hasImage ? "bg-cream/75" : "bg-terracotta"}
                `}
              />

              <span
                className="
                  font-system
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                "
              >
                {label}
              </span>
            </div>

            {/* COLLECTION NAME */}

            <h2
              id="featured-collection-title"
              className="
                max-w-4xl

                font-brand

                text-[clamp(2.6rem,5.5vw,5.5rem)]

                leading-[1.12]
                tracking-[-0.04em]

                text-balance
              "
            >
              {collection.name}
            </h2>

            {/* COLLECTION DESCRIPTION */}

            {collection.description && (
              <p
                className={`
                  mt-7

                  max-w-xl

                  font-editorial
                  text-base

                  leading-8

                  md:text-lg

                  ${hasImage ? "text-cream/90" : "text-coal/70"}
                `}
              >
                {collection.description}
              </p>
            )}

            {/* EDITORIAL CTA */}

            <Link
              href={href}
              className={`
                group

                mt-9

                inline-flex
                min-h-13

                items-center
                justify-center
                gap-5

                px-7
                py-4

                font-system
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.17em]

                transition-colors
                duration-300

                ${
                  hasImage
                    ? "bg-cream text-coal hover:bg-pink"
                    : "bg-coal text-cream hover:bg-terracotta"
                }
              `}
            >
              Explorar colección
              <ArrowUpRight
                aria-hidden="true"
                size={17}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300

                  motion-safe:group-hover:-translate-y-0.5
                  motion-safe:group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </FadeIn>

        {/* =====================================
            EDITORIAL FOOTNOTE
           ===================================== */}

        <div
          className="
            mt-5

            flex
            flex-wrap

            items-center
            justify-between

            gap-4
          "
        >
          <span
            className="
              font-editorial
              text-sm
              italic

              text-coal/60
            "
          >
            Objetos creados con intención.
          </span>

          <span
            className="
              font-system
              text-[10px]
              font-medium
              uppercase
              tracking-[0.18em]

              text-coal/50
            "
          >
            Stephany Manzano · Home Collection
          </span>
        </div>
      </Container>
    </section>
  );
}
