"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { FadeIn } from "@/components/motion/FadeIn";

interface ProductGalleryProps {
  mainImage: any;
  gallery: any[];
}

export function ProductGallery({
  mainImage,
  gallery = [],
}: ProductGalleryProps) {
  // 1. Estado: Aquí guardamos cuál es la foto que se ve en GRANDE
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <FadeIn>
      <div className="space-y-4">
        {/* FOTO GRANDE (Muestra la 'activeImage') */}
        <div className="relative aspect-4/5 bg-white/50 overflow-hidden shadow-sm">
          {activeImage && (
            <Image
              key={activeImage._key || "main"} // La 'key' ayuda a React a animar el cambio
              src={urlFor(activeImage).width(800).height(1000).url()}
              alt="Detalle del producto"
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
          )}
        </div>

        {/* MINIATURAS (Click para cambiar) */}
        <div className="grid grid-cols-5 gap-3">
          {/* Primero ponemos la foto principal original como opción */}
          <button
            onClick={() => setActiveImage(mainImage)}
            className={`relative aspect-square overflow-hidden border-2 transition-all ${
              activeImage === mainImage
                ? "border-terracotta opacity-100"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={urlFor(mainImage).width(200).height(200).url()}
              alt="Principal"
              fill
              className="object-cover"
            />
          </button>

          {/* Luego el resto de la galería */}
          {gallery?.map((image: any, index: number) => (
            <button
              key={image._key || index}
              onClick={() => setActiveImage(image)}
              className={`relative aspect-square overflow-hidden border-2 transition-all ${
                activeImage === image
                  ? "border-terracotta opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={urlFor(image).width(200).height(200).url()}
                alt={`Galería ${index}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
