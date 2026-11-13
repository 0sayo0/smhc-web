import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { PortableText } from "@portabletext/react";

import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

import { getSiteIdentity } from "@/lib/siteIdentity";
import { urlFor } from "@/lib/sanity";

// ========================================
// METADATA
// ========================================

export const metadata: Metadata = {
  title: "Nuestra historia",

  description:
    "Conoce la filosofía y el universo creativo de Stephany Manzano Home Collection. Objetos artesanales creados con intención.",

  alternates: {
    canonical: "/nosotros",
  },
};

// ========================================
// PAGE
// ========================================

export default async function NosotrosPage() {
  const identity = await getSiteIdentity();

  const title =
    identity?.aboutTitle?.trim() || "El arte de crear con intención.";

  const introduction =
    identity?.aboutLead?.trim() ||
    "En Stephany Manzano Home Collection, cada pieza es una exploración de formas, materiales y detalles. Objetos artesanales concebidos para dar carácter y sensibilidad a los espacios.";

  const hasStory =
    Array.isArray(identity?.aboutStory) && identity.aboutStory.length > 0;

  const portrait = identity?.aboutPortrait;

  const processImage = identity?.processImage;

  const hasPortrait = Boolean(portrait?.asset);

  const hasProcessImage = Boolean(processImage?.asset);

  return (
    <main className="min-h-screen bg-cream pb-28 pt-32 lg:pt-44">
      {/* =====================================
          01 — EDITORIAL INTRODUCTION
         ===================================== */}

      <section>
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            {/* LEFT — EDITORIAL CONTENT */}

            <div className="flex flex-col items-start">
              <FadeIn>
                <span className="font-system text-[10px] font-semibold uppercase tracking-[0.28em] text-terracotta">
                  La esencia de SMHC
                </span>

                <h1 className="mt-8 max-w-xl font-brand text-[clamp(2.6rem,4.7vw,5.5rem)] leading-[1.12] tracking-[-0.04em] text-coal text-balance">
                  {title}
                </h1>

                <div
                  aria-hidden="true"
                  className="mt-9 h-px w-14 bg-terracotta"
                />

                <p className="mt-9 max-w-lg font-editorial text-base leading-9 text-coal/75 md:text-lg">
                  {introduction}
                </p>

                <Link
                  href="/catalogo"
                  className="group mt-10 inline-flex items-center gap-3 border-b border-coal/30 pb-2 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-coal transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
                >
                  Descubrir nuestras piezas
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                </Link>
              </FadeIn>
            </div>

            {/* RIGHT — INSTITUTIONAL PHOTOGRAPH */}

            <div className="relative aspect-[4/5] overflow-hidden bg-warm">
              {hasPortrait && portrait ? (
                <Image
                  src={urlFor(portrait)
                    .width(1400)
                    .quality(85)
                    .auto("format")
                    .url()}
                  alt={
                    portrait.alt ||
                    "Fotografía institucional de Stephany Manzano Home Collection"
                  }
                  fill
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
                  <span className="font-editorial text-sm italic text-terracotta">
                    Stephany Manzano
                  </span>

                  <span className="mt-7 max-w-sm font-brand text-[clamp(2rem,4vw,3.8rem)] leading-tight text-coal">
                    Home Collection
                  </span>

                  <div
                    aria-hidden="true"
                    className="mt-10 h-px w-14 bg-terracotta"
                  />

                  <p className="mt-9 font-editorial text-base italic text-coal/60">
                    Forma · Materia · Intención
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================
          02 — THE STORY
         ===================================== */}

      {hasStory && identity?.aboutStory && (
        <section aria-labelledby="about-story-title" className="py-24 md:py-36">
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-3xl">
                <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
                  Detrás de las piezas
                </span>

                <h2
                  id="about-story-title"
                  className="mt-6 font-brand text-3xl leading-tight text-coal md:text-4xl"
                >
                  Una historia que toma forma.
                </h2>

                <div className="mt-10 font-editorial text-base leading-9 text-coal/75 [&_p]:mb-6 [&_h2]:mb-5 [&_h2]:mt-10 [&_h2]:font-brand [&_h2]:text-2xl [&_strong]:font-semibold [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6">
                  <PortableText value={identity.aboutStory} />
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* =====================================
          03 — THE CREATIVE PROCESS
         ===================================== */}

      {hasProcessImage && processImage && (
        <section className={hasStory ? "pb-28" : "py-28"}>
          <Container>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="relative aspect-[5/4] overflow-hidden bg-warm">
                <Image
                  src={urlFor(processImage)
                    .width(1400)
                    .quality(85)
                    .auto("format")
                    .url()}
                  alt={
                    processImage.alt || "Detalle del proceso artesanal de SMHC"
                  }
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <FadeIn>
                <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
                  El proceso creativo
                </span>

                <h2 className="mt-7 font-brand text-3xl leading-tight text-coal md:text-4xl">
                  La belleza está en los detalles.
                </h2>

                <div
                  aria-hidden="true"
                  className="mt-8 h-px w-12 bg-terracotta"
                />

                <p className="mt-8 max-w-lg font-editorial text-base leading-8 text-coal/70">
                  Cada material, textura y acabado forma parte de la identidad
                  de una pieza. Una manera de entender la creación artesanal
                  desde la sensibilidad y el cuidado de los detalles.
                </p>
              </FadeIn>
            </div>
          </Container>
        </section>
      )}

      {/* =====================================
          04 — BRAND STATEMENT
         ===================================== */}

      <section className="py-20 md:py-28">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl border-y border-coal/15 px-4 py-16 text-center md:py-24">
              <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
                Nuestra filosofía
              </span>

              <p className="mx-auto mt-9 max-w-3xl font-brand text-[clamp(1.8rem,3.4vw,3.3rem)] leading-[1.35] text-coal text-balance">
                {identity?.closingStatement?.trim() ||
                  "Crear objetos que acompañen los espacios y hagan de los pequeños detalles algo especial."}
              </p>

              <p className="mt-8 font-editorial text-sm italic text-coal/60">
                Stephany Manzano · Home Collection
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* =====================================
          05 — DISCOVER SMHC
         ===================================== */}

      <section className="pb-12 pt-8">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-brand text-3xl leading-tight text-coal md:text-4xl">
                Descubre nuestro universo.
              </h2>

              <p className="mx-auto mt-7 max-w-xl font-editorial text-base leading-8 text-coal/65">
                Explora nuestras piezas, sus materiales y las colecciones que
                dan forma a SMHC.
              </p>

              <Link
                href="/colecciones"
                className="group mt-10 inline-flex min-h-13 items-center justify-center gap-4 bg-coal px-8 py-4 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-cream transition-colors duration-300 hover:bg-terracotta"
              >
                Explorar colecciones
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
