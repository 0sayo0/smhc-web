import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="bg-coal text-cream pt-20 pb-10 border-t border-coal">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 border-b border-cream/10 pb-16">
          {/* BLOQUE IZQUIERDO: Logo y Manifiesto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* EL SELLO (Logo) */}
            <img
              src="/smhc_logo_nobg.png"
              alt="Sello Stephany Manzano"
              className="w-12 md:w-14 mb-6 brightness-0 invert opacity-60"
            />

            <span className="text-2xl md:text-3xl font-brand tracking-[0.15em] text-cream">
              STEPHANY MANZANO
            </span>
            <span className="text-[12px] font-editorial italic text-terracotta tracking-[0.25em] uppercase mt-2">
              Home Collection
            </span>
            <p className="mt-6 text-xs font-system text-cream/50 max-w-xs leading-relaxed">
              Creando piezas escultóricas hechas a mano con intención, diseño y
              delicadeza.
            </p>
          </div>

          {/* BLOQUE DERECHO: Redes y Contacto */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-8 text-[10px] font-system font-semibold tracking-[0.2em] uppercase text-cream/70">
              <a
                href="https://instagram.com/tu_usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@tu_usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta transition-colors"
              >
                TikTok
              </a>
              <Link
                href="/contacto"
                className="hover:text-terracotta transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-system uppercase tracking-widest text-cream/30">
          <p>© {new Date().getFullYear()} Stephany Manzano Home Collection.</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
