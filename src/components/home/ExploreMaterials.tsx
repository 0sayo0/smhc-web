import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

import { urlFor } from "@/lib/sanity";

import type { CatalogCategory } from "@/lib/catalog";

interface ExploreMaterialsProps {
  categories: CatalogCategory[];
}

export function ExploreMaterials({ categories }: ExploreMaterialsProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="explore-materials-title"
      className="py-20 md:py-28"
    >
      <Container>
        {/* =====================================
            EDITORIAL INTRODUCTION
           ===================================== */}

        <FadeIn>
          <header className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            <span className="font-system text-[10px] font-semibold uppercase tracking-[0.28em] text-terracotta">
              Nuestro universo
            </span>

            <h2
              id="explore-materials-title"
              className="mt-7 font-brand text-[clamp(2.3rem,4vw,4.3rem)] leading-[1.15] tracking-[-0.035em] text-coal text-balance"
            >
              La belleza toma
              <br className="hidden sm:block" /> distintas formas.
            </h2>

            <div
              aria-hidden="true"
              className="mx-auto mt-8 h-px w-12 bg-terracotta"
            />

            <p className="mx-auto mt-8 max-w-xl font-editorial text-base leading-8 text-coal/65 md:text-lg">
              Una exploración de materiales, texturas y formas que transforman
              lo cotidiano en algo especial.
            </p>
          </header>
        </FadeIn>

        {/* =====================================
            DYNAMIC CATEGORY GRID
           ===================================== */}

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12">
          {categories.map((category, index) => {
            const hasImage = Boolean(category.coverImage?.asset);

            const href = `/catalogo/${encodeURIComponent(category.slug)}`;

            return (
              <FadeIn
                key={category._id}
                delay={Math.min(index * 0.13, 0.39)}
                duration={0.85}
                distance={24}
              >
                <article key={category._id} className="group">
                  <Link href={href} className="block">
                    {/* EDITORIAL PHOTOGRAPHY */}

                    <div className="relative isolate aspect-[5/4] overflow-hidden bg-warm sm:aspect-[6/5]">
                      {hasImage && category.coverImage ? (
                        <>
                          <Image
                            src={urlFor(category.coverImage)
                              .width(1400)
                              .quality(85)
                              .auto("format")
                              .url()}
                            alt={category.coverImage.alt || category.name}
                            fill
                            sizes="(max-width: 767px) 100vw, 50vw"
                            className="object-cover transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.045]"
                          />

                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-linear-to-t from-coal/75 via-coal/10 to-transparent"
                          />
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                          <span className="font-editorial text-sm italic text-terracotta">
                            Stephany Manzano
                          </span>

                          <span
                            aria-hidden="true"
                            className="mt-8 h-px w-12 bg-terracotta"
                          />
                        </div>
                      )}

                      {/* CATEGORY IDENTITY */}

                      <div
                        className={`absolute inset-x-7 bottom-8 flex items-end justify-between gap-5 sm:inset-x-10 sm:bottom-10 ${
                          hasImage ? "text-cream" : "text-coal"
                        }`}
                      >
                        <div>
                          <span className="font-system text-[10px] font-medium uppercase tracking-[0.2em]">
                            {String(index + 1).padStart(2, "0")}
                            {" / SMHC"}
                          </span>

                          <h3 className="mt-4 font-brand text-[clamp(1.8rem,3vw,3.2rem)] leading-tight text-balance">
                            {category.name}
                          </h3>
                        </div>

                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center transition-colors duration-300 ${
                            hasImage
                              ? "bg-cream text-coal group-hover:bg-pink"
                              : "bg-coal text-cream group-hover:bg-terracotta"
                          }`}
                        >
                          <ArrowUpRight
                            aria-hidden="true"
                            size={20}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                          />
                        </span>
                      </div>
                    </div>

                    {/* CATEGORY DESCRIPTION */}

                    <div className="pt-7">
                      {category.description && (
                        <p className="max-w-lg font-editorial text-base leading-8 text-coal/70">
                          {category.description}
                        </p>
                      )}

                      <span className="mt-6 inline-flex items-center gap-3 border-b border-coal/30 pb-2 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-coal transition-colors duration-300 group-hover:border-terracotta group-hover:text-terracotta">
                        Explorar categoría
                        <ArrowUpRight
                          aria-hidden="true"
                          size={15}
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
