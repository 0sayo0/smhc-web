"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false);

  // Estados para la magia del Scroll
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);

        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setIsMobileMenuOpen(false);
          setIsMobileCollectionOpen(false);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-cream border-b border-coal/5 shadow-sm transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Container className="py-2 lg:py-3">
        {/* === VERSIÓN DESKTOP === */}
        <div className="hidden xl:flex flex-col items-center justify-center">
          {/* SECCIÓN COLAPSABLE DESKTOP (Logo y Título) */}
          <div
            className={`flex flex-col items-center overflow-hidden transition-all duration-700 ease-in-out ${
              isAtTop
                ? "max-h-48 opacity-100 mb-4 mt-1"
                : "max-h-0 opacity-0 mb-0 mt-0"
            }`}
          >
            <Link href="/" className="flex flex-col items-center group">
              <img
                src="/smhc_logo_nobg.png"
                alt="Logo"
                className="w-10 opacity-90 brightness-0"
              />
              <span className="text-lg lg:text-xl font-brand text-coal tracking-[0.15em] group-hover:opacity-70 transition-opacity">
                STEPHANY MANZANO
              </span>
              <span className="text-[12px] font-medium font-editorial italic text-terracotta tracking-[0.25em] uppercase mt-1">
                Home Collection
              </span>
            </Link>
          </div>

          {/* ENLACES DESKTOP */}
          {/* EL TRUCO ESTÁ AQUÍ: Agregamos ${isAtTop ? "" : "py-3"} para darle aire al hacer scroll */}
          <div
            className={`flex items-center gap-14 text-[11px] font-system font-semibold tracking-[0.15em] uppercase text-coal transition-all duration-500 ${
              isAtTop ? "" : "py-3"
            }`}
          >
            {/* ITEM 1: COLECCIÓN (GATILLO INTELIGENTE PARA TOUCH) */}
            <div
              className="relative group flex items-center h-full cursor-pointer"
              aria-haspopup="true"
            >
              <span className="hover:text-terracotta transition-colors pb-1 border-b border-transparent group-hover:border-terracotta uppercase">
                Colección
              </span>

              {/* EL PANEL DESPLEGABLE */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[220px]">
                <div className="bg-cream border border-coal/10 shadow-xl py-5 flex flex-col items-center gap-4 text-center">
                  <Link
                    href="/coleccion/cera"
                    className="text-[10px] tracking-[0.2em] text-coal hover:text-terracotta transition-colors w-full block px-4"
                  >
                    Cera Artesanal
                  </Link>
                  <Link
                    href="/coleccion/piedra-escultural"
                    className="text-[10px] tracking-[0.2em] text-coal hover:text-terracotta transition-colors w-full block px-4"
                  >
                    Piedra Escultural
                  </Link>
                  <div className="w-8 h-[1px] bg-coal/10 mt-1"></div>
                  <Link
                    href="/"
                    className="text-[9px] tracking-[0.2em] text-coal/50 hover:text-coal transition-colors w-full block px-4"
                  >
                    Ver Catálogo Base
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/nosotros"
              className="hover:text-terracotta transition-colors pb-1 border-b border-transparent hover:border-terracotta"
            >
              Sobre Mí
            </Link>
            <Link
              href="/contacto"
              className="hover:text-terracotta transition-colors pb-1 border-b border-transparent hover:border-terracotta"
            >
              Contacto
            </Link>
          </div>
        </div>

        {/* === VERSIÓN MÓVIL Y TABLET === */}
        <div className="flex xl:hidden items-center justify-between">
          <button
            className="p-1.5 -ml-1.5 text-coal focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>

          {/* Logo SIEMPRE visible en Móvil y Tablet */}
          <div className="flex flex-col items-center mt-1">
            <Link href="/" className="flex flex-col items-center">
              <span className="text-lg font-brand text-coal tracking-[0.1em] leading-none">
                STEPHANY MANZANO
              </span>
              <span className="text-[10px] font-medium font-editorial italic text-terracotta tracking-[0.2em] uppercase mt-1">
                Home Collection
              </span>
            </Link>
          </div>

          <div className="w-8"></div>
        </div>
      </Container>

      {/* === MENÚ DESPLEGABLE MÓVIL Y TABLET === */}
      <div
        className={`xl:hidden absolute top-full left-0 w-full bg-cream border-b border-coal/5 overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[400px] py-8 shadow-xl opacity-100"
            : "max-h-0 py-0 border-transparent shadow-none opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 text-[10px] font-system font-semibold tracking-[0.15em] uppercase text-coal">
          {/* ACORDEÓN DE COLECCIÓN */}
          <div className="flex flex-col items-center w-full">
            <button
              onClick={() => setIsMobileCollectionOpen(!isMobileCollectionOpen)}
              className="flex items-center gap-2 hover:text-terracotta transition-colors uppercase"
            >
              Colección
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${isMobileCollectionOpen ? "rotate-180 text-terracotta" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
                isMobileCollectionOpen
                  ? "max-h-40 opacity-100 mt-6 gap-5"
                  : "max-h-0 opacity-0 mt-0 gap-0"
              }`}
            >
              <Link
                href="/coleccion/cera"
                className="text-coal/70 hover:text-terracotta transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileCollectionOpen(false);
                }}
              >
                Cera Artesanal
              </Link>
              <Link
                href="/coleccion/piedra-escultural"
                className="text-coal/70 hover:text-terracotta transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileCollectionOpen(false);
                }}
              >
                Piedra Escultural
              </Link>
            </div>
          </div>

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
