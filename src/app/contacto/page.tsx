import type { Metadata } from "next";

import Link from "next/link";

import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

import { getSiteIdentity } from "@/lib/siteIdentity";
import { getWhatsappUrl } from "@/lib/whatsapp";

// ========================================
// METADATA
// ========================================

export const metadata: Metadata = {
  title: "Contacto",

  description:
    "Comunícate con Stephany Manzano Home Collection para recibir información sobre nuestras piezas artesanales y colecciones.",

  alternates: {
    canonical: "/contacto",
  },
};

// ========================================
// EXTERNAL LINK VALIDATION
// ========================================

function getInstagramHref(value: string | null | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);

    const isInstagram =
      url.hostname === "instagram.com" || url.hostname === "www.instagram.com";

    if (url.protocol !== "https:" || !isInstagram) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

// ========================================
// PAGE
// ========================================

export default async function ContactoPage() {
  const identity = await getSiteIdentity();

  const whatsappUrl = getWhatsappUrl(
    "Hola, me gustaría recibir información sobre las piezas de Stephany Manzano Home Collection.",
  );

  const instagramUrl = getInstagramHref(identity?.instagramUrl);

  const introduction =
    identity?.contactIntro?.trim() ||
    "Si tienes alguna pregunta sobre nuestras piezas, su disponibilidad o sus características, estaremos encantados de atenderte personalmente.";

  return (
    <main className="min-h-screen bg-cream pb-28 pt-32 lg:pt-44">
      <Container>
        {/* =====================================
            01 — EDITORIAL INTRODUCTION
           ===================================== */}

        <FadeIn>
          <header className="mx-auto max-w-4xl text-center">
            <span className="font-system text-[10px] font-semibold uppercase tracking-[0.28em] text-terracotta">
              Atención personalizada
            </span>

            <h1 className="mt-8 font-brand text-[clamp(3rem,6vw,6rem)] leading-[1.12] tracking-[-0.04em] text-coal">
              Hablemos.
            </h1>

            <div
              aria-hidden="true"
              className="mx-auto mt-9 h-px w-14 bg-terracotta"
            />

            <p className="mx-auto mt-9 max-w-2xl font-editorial text-base leading-8 text-coal/70 md:text-lg">
              {introduction}
            </p>
          </header>
        </FadeIn>

        {/* =====================================
            02 — CONTACT CHANNELS
           ===================================== */}

        <section aria-label="Canales de contacto" className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-px bg-coal/10 md:grid-cols-2">
            {/* WHATSAPP */}
            <FadeIn
              direction="up"
              duration={0.75}
              distance={20}
              className="h-full"
            >
              <div className="flex min-h-[400px] flex-col items-start bg-warm p-9 sm:p-12 lg:p-16">
                <span className="font-system text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta">
                  01 / Atención directa
                </span>

                <MessageCircle
                  aria-hidden="true"
                  size={31}
                  strokeWidth={1.2}
                  className="mt-12 text-coal"
                />

                <h2 className="mt-8 font-brand text-3xl text-coal">WhatsApp</h2>

                <p className="mt-6 max-w-sm font-editorial text-base leading-8 text-coal/70">
                  Escríbenos para conocer más sobre nuestras piezas y resolver
                  tus dudas de manera personalizada.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto inline-flex min-h-13 items-center gap-4 border-b border-coal/35 pb-2 pt-10 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-coal transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
                >
                  Iniciar conversación
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </FadeIn>

            {/* INSTAGRAM / BRAND CONNECTION */}
            <FadeIn
              direction="up"
              delay={0.12}
              duration={0.75}
              distance={20}
              className="h-full"
            >
              <div className="flex min-h-[400px] flex-col items-start bg-soft p-9 sm:p-12 lg:p-16">
                <span className="font-system text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta">
                  02 / Nuestro universo
                </span>

                <Instagram
                  aria-hidden="true"
                  size={31}
                  strokeWidth={1.2}
                  className="mt-12 text-coal"
                />

                <h2 className="mt-8 font-brand text-3xl text-coal">
                  Instagram
                </h2>

                <p className="mt-6 max-w-sm font-editorial text-base leading-8 text-coal/70">
                  Descubre nuestras creaciones, novedades y fotografías de las
                  piezas que forman parte de SMHC.
                </p>

                {instagramUrl ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-auto inline-flex min-h-13 items-center gap-4 border-b border-coal/35 pb-2 pt-10 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-coal transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
                  >
                    Visitar Instagram
                    <ArrowUpRight
                      aria-hidden="true"
                      size={17}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                    />
                  </a>
                ) : (
                  <span className="mt-auto pt-10 font-editorial text-sm italic text-coal/55">
                    Explora nuestras creaciones en el catálogo.
                  </span>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* =====================================
            03 — EXPLORE OUR PIECES
           ===================================== */}

        <section className="py-24 md:py-32">
          <FadeIn>
            <div className="mx-auto max-w-3xl border-t border-coal/15 pt-14 text-center">
              <span className="font-system text-[10px] font-semibold uppercase tracking-[0.25em] text-terracotta">
                Descubre SMHC
              </span>

              <h2 className="mt-7 font-brand text-3xl leading-tight text-coal md:text-4xl">
                Cada pieza tiene algo que contar.
              </h2>

              <p className="mx-auto mt-7 max-w-xl font-editorial text-base leading-8 text-coal/65">
                Explora nuestro catálogo y conoce las creaciones que forman
                parte de nuestra colección de hogar.
              </p>

              <Link
                href="/catalogo"
                className="group mt-10 inline-flex min-h-13 items-center justify-center gap-4 bg-coal px-8 py-4 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-cream transition-colors duration-300 hover:bg-terracotta"
              >
                Explorar catálogo
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </FadeIn>
        </section>
      </Container>
    </main>
  );
}
