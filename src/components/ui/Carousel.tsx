"use client";

import { useRef, ReactNode } from "react";

export function Carousel({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    // 1. Usamos group/carousel para no interferir con los productos
    // 2. max-w-[90rem] y mx-auto centran el carrusel para que no se estire al infinito
    <div className="relative group/carousel max-w-[90rem] mx-auto">
      {/* BOTÓN IZQUIERDA (Más grande, con sombra y siempre semi-visible) */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 items-center justify-center bg-white shadow-lg text-coal rounded-full opacity-60 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-105 border border-coal/10"
        aria-label="Anterior"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* CONTENEDOR DE SCROLL (Aumentamos el padding lateral a lg:px-24) */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 md:gap-4 lg:gap-6 px-6 md:px-12 lg:px-24 pb-12 snap-x snap-mandatory hide-scrollbar"
      >
        {children}
      </div>

      {/* BOTÓN DERECHA */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 items-center justify-center bg-white shadow-lg text-coal rounded-full opacity-60 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-105 border border-coal/10"
        aria-label="Siguiente"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
