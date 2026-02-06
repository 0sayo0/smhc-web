import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="bg-coal text-cream py-16 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Marca */}
          <div className="text-center md:text-left">
            <h3 className="font-brand text-2xl mb-2">Stephany Manzano</h3>
            <p className="font-editorial text-terracotta text-sm italic">
              Home Collection
            </p>
          </div>

          {/* Redes Sociales (Simuladas por ahora) */}
          <div className="flex gap-6 text-sm font-system tracking-widest uppercase text-white/60">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-terracotta transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="https://tiktok.com"
              target="_blank"
              className="hover:text-terracotta transition-colors"
            >
              TikTok
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs font-system text-white/30">
          &copy; {new Date().getFullYear()} Stephany Manzano Home Collection.
          Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}
