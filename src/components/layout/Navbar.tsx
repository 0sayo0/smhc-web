"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Importamos el "GPS" de Next.js
import { Container } from "@/components/layout/Container";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. Le preguntamos a Next.js en qué ruta estamos
  const pathname = usePathname();
  const isHomePage = pathname === "/"; // ¿Estamos en la portada?

  useEffect(() => {
    const handleScroll = () => {
      // Si estamos en el home, el cambio es hasta pasar la foto gigante.
      // Si estamos en otra página, el cambio es casi inmediato (20px).
      const scrollThreshold = isHomePage ? window.innerHeight - 80 : 20;

      if (window.scrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Revisar posición inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]); // Actualizar si cambiamos de página

  // 3. LÓGICA DE ESTILOS INTELIGENTE
  // Si NO estamos en el home, siempre forzamos el modo "sólido" (oscuro) desde el inicio.
  const isSolidMode = !isHomePage || isScrolled || isMobileMenuOpen;

  const textColorClass = isSolidMode ? "text-coal" : "text-cream";
  const navBackgroundClass = isSolidMode
    ? "py-4 bg-cream/95 backdrop-blur-md border-b border-coal/5 shadow-sm"
    : "py-6 bg-transparent border-transparent";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBackgroundClass}`}
    >
      <Container className="flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className={`relative z-50 text-3xl font-brand hover:opacity-70 transition-colors duration-500 tracking-wide ${textColorClass}`}
        >
          Stephany Manzano
        </Link>

        {/* ENLACES DESKTOP */}
        <div
          className={`hidden md:flex gap-6 md:gap-10 text-sm font-system font-medium tracking-widest uppercase transition-colors duration-500 ${textColorClass}`}
        >
          <Link href="/" className="hover:text-terracotta transition-colors">
            Colección
          </Link>
          <Link
            href="/nosotros"
            className="hover:text-terracotta transition-colors"
          >
            Sobre Mí
          </Link>
          <Link
            href="/contacto"
            className="hover:text-terracotta transition-colors"
          >
            Contacto
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA */}
        <button
          className={`md:hidden relative z-50 p-2 focus:outline-none transition-colors duration-500 ${textColorClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </Container>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-cream/100 backdrop-blur-md border-b border-coal/5 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-64 py-8 shadow-xl"
            : "max-h-0 py-0 border-transparent shadow-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 text-xs font-system font-medium tracking-widest uppercase text-coal/80">
          <Link
            href="/"
            className="hover:text-terracotta transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Colección
          </Link>
          <Link
            href="/nosotros"
            className="hover:text-terracotta transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sobre Mí
          </Link>
          <Link
            href="/contacto"
            className="hover:text-terracotta transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
