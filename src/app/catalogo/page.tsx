import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/FadeIn";

import { Container } from "@/components/layout/Container";

import { CategoryCard } from "@/components/catalog/CategoryCard";

import { getRootCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Nuestro catálogo",

  description:
    "Explora las colecciones de hogar de Stephany Manzano: piezas artesanales de cera y objetos de piedra escultural.",

  alternates: {
    canonical: "/catalogo",
  },
};

export default async function CatalogPage() {
  const categories = await getRootCategories();

  return (
    <main
      className="
        min-h-screen
        bg-cream

        pt-36
        pb-32

        lg:pt-48
      "
    >
      <Container>
        {/* EDITORIAL INTRO */}
        <FadeIn direction="up" duration={0.75}>
          <header
            className="
            mx-auto

            max-w-4xl

            text-center
          "
          >
            <span
              className="
              font-system
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.3em]

              text-terracotta
            "
            >
              El universo SMHC
            </span>

            <h1
              className="
              mt-8

              font-brand
              text-[clamp(2.5rem,5vw,5.5rem)]

              leading-[1.15]
              tracking-[-0.035em]

              text-coal
              text-balance
            "
            >
              Objetos que transforman
              <br className="hidden md:block" /> la forma de habitar.
            </h1>

            <div
              aria-hidden="true"
              className="
              mx-auto
              mt-9

              h-px
              w-14

              bg-terracotta
            "
            />

            <p
              className="
              mx-auto
              mt-9

              max-w-2xl

              font-editorial
              text-base
              md:text-lg

              leading-8

              text-coal/65
            "
            >
              Una exploración de materiales, formas y sensibilidad artesanal.
              Piezas creadas con intención para acompañar tus espacios.
            </p>
          </header>
        </FadeIn>

        {/* CATEGORIES */}

        {categories.length > 0 ? (
          <section
            aria-label="Categorías del catálogo"
            className="
              mt-20

              grid
              grid-cols-1

              gap-x-7
              gap-y-16

              md:grid-cols-2

              xl:gap-x-10
            "
          >
            {categories.map((category, index) => (
              <CategoryCard
                key={category._id}
                category={category}
                index={index}
                href={`/catalogo/${category.slug}`}
              />
            ))}
          </section>
        ) : (
          <section
            className="
              mx-auto
              mt-20

              max-w-xl

              border-t
              border-coal/15

              pt-12
              text-center
            "
          >
            <p
              className="
                font-editorial
                text-lg
                italic

                text-coal/65
              "
            >
              Estamos preparando nuevas piezas para nuestra colección de hogar.
            </p>
          </section>
        )}
      </Container>
    </main>
  );
}
