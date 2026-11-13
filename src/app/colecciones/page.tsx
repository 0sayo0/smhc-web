import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { CollectionCard } from "@/components/collections/CollectionCard";

import { getVisibleCollections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Colecciones",
  description:
    "Explora las colecciones editoriales de Stephany Manzano Home Collection. Piezas artesanales, inspiración y diseño para el hogar.",
  alternates: {
    canonical: "/colecciones",
  },
};

export default async function CollectionsPage() {
  const collections = await getVisibleCollections();

  return (
    <main className="min-h-screen bg-cream pb-32 pt-36 lg:pt-48">
      <Container>
        <FadeIn>
          <header className="mx-auto max-w-4xl text-center">
            <span className="font-system text-[10px] font-semibold uppercase tracking-[0.3em] text-terracotta">
              El universo creativo de SMHC
            </span>

            <h1 className="mt-8 font-brand text-[clamp(2.8rem,5vw,5.4rem)] leading-[1.15] tracking-[-0.035em] text-coal text-balance">
              Historias hechas objeto.
            </h1>

            <div
              aria-hidden="true"
              className="mx-auto mt-9 h-px w-14 bg-terracotta"
            />

            <p className="mx-auto mt-9 max-w-2xl font-editorial text-base leading-8 text-coal/70 md:text-lg">
              Cada colección nace de una inspiración distinta. Una exploración
              de materiales, formas y detalles que transforman los espacios en
              lugares especiales.
            </p>
          </header>
        </FadeIn>

        {collections.length > 0 ? (
          <section
            aria-label="Colecciones disponibles"
            className="mt-20 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2"
          >
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection._id}
                collection={collection}
                index={index}
              />
            ))}
          </section>
        ) : (
          <section className="mx-auto mt-20 max-w-xl border-t border-coal/15 pt-12 text-center">
            <p className="font-editorial text-lg italic leading-8 text-coal/65">
              Estamos preparando nuevas historias para compartir contigo.
            </p>
          </section>
        )}
      </Container>
    </main>
  );
}
