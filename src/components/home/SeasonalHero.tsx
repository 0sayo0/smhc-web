import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { urlFor } from "@/lib/sanity";

import type { SanityImageObject } from "@sanity/image-url";

export interface SeasonalCampaign {
  enabled?: boolean;
  eyebrow?: string | null;
  headline?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;

  image?:
    | (SanityImageObject & {
        alt?: string;
      })
    | null;
}

interface SeasonalHeroProps {
  campaign?: SeasonalCampaign | null;
}

export function SeasonalHero({ campaign }: SeasonalHeroProps) {
  const isCampaignActive = campaign?.enabled === true;

  // Contenido permanente.
  const defaultContent = {
    eyebrow: "Stephany Manzano · Home Collection",
    headline: "La belleza de habitar.",
    description:
      "Objetos artesanales creados para transformar lo cotidiano en algo extraordinario. Una celebración de la forma, la naturaleza y los pequeños detalles.",
    ctaLabel: "Descubrir piezas",
    ctaHref: "#piezas",
  };

  // Contenido de temporada.
  const seasonalContent = {
    eyebrow: campaign?.eyebrow?.trim() || "Edición de temporada",

    headline: campaign?.headline?.trim() || "Temporada de encuentros.",

    description:
      campaign?.description?.trim() ||
      "Piezas creadas para acompañar los momentos que merecen quedarse.",

    ctaLabel: campaign?.ctaLabel?.trim() || "Explorar piezas",

    ctaHref: campaign?.ctaHref?.trim() || "#piezas",
  };

  const content = isCampaignActive ? seasonalContent : defaultContent;

  // Solo permitimos destinos internos.
  const safeHref = /^(\/(?!\/)|#)/.test(content.ctaHref)
    ? content.ctaHref
    : "#piezas";

  // Imagen de temporada o imagen permanente.
  const hasCampaignImage = isCampaignActive && Boolean(campaign?.image?.asset);

  const imageSrc = hasCampaignImage
    ? urlFor(campaign!.image!).width(1800).quality(85).auto("format").url()
    : "/hero-smhc.webp";

  const imageAlt = hasCampaignImage
    ? campaign?.image?.alt?.trim() ||
      "Composición artesanal de Stephany Manzano"
    : "Composición editorial de Stephany Manzano Home Collection";

  return (
    <section
      aria-labelledby="home-hero-title"
      className="
        relative
        pt-24
        pb-8
        sm:pt-28
        xl:pt-46
        xl:pb-6
      "
    >
      <div
        className="
          mx-auto
          max-w-360
          px-4
          sm:px-6
          lg:px-10
        "
      >
        <div
          className="
            grid
            overflow-hidden
            border
            border-coal/10
            bg-warm

            lg:min-h-[min(740px,calc(100svh-12rem))]
            lg:grid-cols-[0.94fr_1.06fr]
          "
        >
          {/* ============================
              CONTENIDO EDITORIAL
             ============================ */}

          <div
            className="
              relative
              flex
              flex-col
              justify-center

              px-7
              py-12

              sm:px-10
              sm:py-14

              lg:px-10
              lg:py-8

              xl:px-14
              xl:py-10
            "
          >
            {/* ETIQUETA */}

            <div
              className="
                smhc-reveal
                smhc-delay-1

                mb-6
                flex
                items-center
                gap-4
              "
            >
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-terracotta"
              />

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
                {content.eyebrow}
              </span>
            </div>

            {/* TÍTULO PRINCIPAL */}

            <h1
              id="home-hero-title"
              className="
                smhc-reveal
                smhc-delay-2

                max-w-155

                font-brand
                text-[clamp(2.5rem,4.2vw,4.7rem)]
                leading-[1.1]
                tracking-[-0.045em]

                text-coal
                text-balance
              "
            >
              {content.headline}
            </h1>

            {/* DESCRIPCIÓN */}

            <p
              className="
                smhc-reveal
                smhc-delay-3

                mt-6
                max-w-md

                font-editorial
                text-[15px]
                leading-7

                text-coal/75

                md:text-base
                md:leading-8
              "
            >
              {content.description}
            </p>

            {/* ACCIONES */}

            <div
              className="
                smhc-reveal
                smhc-delay-4

                mt-8

                flex
                flex-col
                items-start
                gap-6

                sm:flex-row
                sm:items-center
                sm:gap-8
              "
            >
              <Link
                href={safeHref}
                className="
                  group

                  inline-flex
                  min-h-13
                  items-center
                  justify-center
                  gap-5

                  bg-coal
                  px-7
                  py-4

                  font-system
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]

                  text-cream

                  transition-colors
                  duration-300

                  hover:bg-terracotta
                "
              >
                {content.ctaLabel}

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

              <Link
                href="/nosotros"
                className="
                  border-b
                  border-coal/40
                  pb-1

                  font-system
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.15em]

                  text-coal

                  transition-colors
                  duration-300

                  hover:border-terracotta
                  hover:text-terracotta
                "
              >
                Nuestra historia
              </Link>
            </div>

            {/* FIRMA EDITORIAL */}

            <div
              className="
                smhc-reveal
                smhc-delay-5

                mt-12

                border-t
                border-coal/15

                pt-5
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
                Objetos hechos con intención.
              </span>
            </div>
          </div>

          {/* ============================
              FOTOGRAFÍA EDITORIAL
             ============================ */}

          <div
            className="
              smhc-media-enter
              group

              relative
              min-h-90

              overflow-hidden
              bg-coal

              sm:min-h-122.5

              lg:min-h-0
            "
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              preload
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="
                object-cover
                object-center

                transition-transform
                duration-1200
                ease-out

                motion-safe:group-hover:scale-[1.035]
              "
            />

            {/* GRADIENTE INFERIOR */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0

                bg-linear-to-t
                from-coal/45
                via-transparent
                to-transparent
              "
            />

            {/* FIRMA SOBRE LA FOTOGRAFÍA */}

            <div
              className="
                absolute
                right-7
                bottom-7
                left-7

                border-t
                border-cream/50

                pt-4

                sm:right-10
                sm:bottom-10
                sm:left-10
              "
            >
              <p
                className="
                  font-system
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-cream
                "
              >
                El arte de lo hecho a mano
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
