import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";

import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="border-t border-coal bg-coal pb-10 pt-20 text-cream md:pt-24">
      <Container>
        {/* =====================================
            MAIN FOOTER
           ===================================== */}

        <FadeIn
          direction="up"
          duration={0.8}
          distance={16}
          className="grid grid-cols-1 gap-16 border-b border-cream/15 pb-20 lg:grid-cols-[1.4fr_1fr] lg:gap-24"
        >
          {/* BRAND IDENTITY */}

          <div className="flex flex-col items-start">
            <Link
              href="/"
              aria-label="Stephany Manzano Home Collection, inicio"
              className="group"
            >
              <Image
                src="/smhc_logo_nobg.png"
                alt=""
                width={56}
                height={64}
                className="h-16 w-14 object-contain brightness-0 invert opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
            </Link>

            <p className="mt-8 font-brand text-2xl tracking-[0.12em] text-cream md:text-3xl">
              STEPHANY MANZANO
            </p>

            <span className="mt-3 font-editorial text-sm italic tracking-[0.15em] text-pink">
              Home Collection
            </span>

            <p className="mt-8 max-w-md font-editorial text-base leading-8 text-cream/65">
              Objetos artesanales creados con intención, sensibilidad y atención
              a los detalles.
            </p>
          </div>

          {/* NAVIGATION */}

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <nav aria-label="Navegación del pie de página">
              <h2 className="font-system text-[10px] font-semibold uppercase tracking-[0.23em] text-pink">
                Explorar
              </h2>

              <ul className="mt-8 flex flex-col gap-5">
                <li>
                  <Link
                    href="/catalogo"
                    className="font-editorial text-base text-cream/75 transition-colors hover:text-cream"
                  >
                    Catálogo
                  </Link>
                </li>

                <li>
                  <Link
                    href="/colecciones"
                    className="font-editorial text-base text-cream/75 transition-colors hover:text-cream"
                  >
                    Colecciones
                  </Link>
                </li>

                <li>
                  <Link
                    href="/nosotros"
                    className="font-editorial text-base text-cream/75 transition-colors hover:text-cream"
                  >
                    Nuestra historia
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="font-system text-[10px] font-semibold uppercase tracking-[0.23em] text-pink">
                Contacto
              </h2>

              <p className="mt-8 font-editorial text-base leading-7 text-cream/65">
                ¿Quieres saber más sobre nuestras piezas?
              </p>

              <Link
                href="/contacto"
                className="group mt-6 inline-flex items-center gap-3 border-b border-cream/40 pb-2 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-cream transition-colors hover:border-pink hover:text-pink"
              >
                Escríbenos
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* =====================================
            FOOTER SIGNATURE
           ===================================== */}

        <div className="flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
          <p className="font-system text-[10px] leading-6 tracking-[0.08em] text-cream/50">
            © {new Date().getFullYear()} Stephany Manzano Home Collection.
          </p>

          <span className="font-editorial text-sm italic text-cream/50">
            El arte de lo hecho a mano.
          </span>
        </div>
      </Container>
    </footer>
  );
}
