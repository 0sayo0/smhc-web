"use client";

import { useState } from "react";
import Image from "next/image";

import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/lib/sanity";
import { FadeIn } from "@/components/motion/FadeIn";

interface ProductGalleryProps {
  mainImage: SanityImageSource | null;
  gallery?: SanityImageSource[] | null;
}

export function ProductGallery({ mainImage, gallery }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<SanityImageSource | null>(
    mainImage,
  );

  const images = gallery ?? [];

  if (!mainImage) {
    return (
      <div className="flex aspect-4/5 items-center justify-center bg-warm">
        <p className="font-editorial text-sm italic text-coal/50">
          Imagen no disponible
        </p>
      </div>
    );
  }

  return (
    <FadeIn>
      <div className="space-y-4">
        {/* IMAGEN PRINCIPAL */}

        <div className="relative aspect-4/5 overflow-hidden bg-white/50 shadow-sm">
          {activeImage && (
            <Image
              src={urlFor(activeImage).width(1000).height(1250).url()}
              alt="Detalle del producto"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
            />
          )}
        </div>

        {/* MINIATURAS */}

        <div className="grid grid-cols-5 gap-3">
          {/* IMAGEN ORIGINAL */}

          <button
            type="button"
            onClick={() => setActiveImage(mainImage)}
            aria-label="Mostrar imagen principal"
            aria-pressed={activeImage === mainImage}
            className={`relative aspect-square overflow-hidden border-2 transition-all ${
              activeImage === mainImage
                ? "border-terracotta opacity-100"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={urlFor(mainImage).width(200).height(200).url()}
              alt="Vista principal"
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>

          {/* IMÁGENES ADICIONALES */}

          {images.map((image, index) => (
            <button
              key={`gallery-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              aria-label={`Mostrar imagen ${index + 2}`}
              aria-pressed={activeImage === image}
              className={`relative aspect-square overflow-hidden border-2 transition-all ${
                activeImage === image
                  ? "border-terracotta opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={urlFor(image).width(200).height(200).url()}
                alt={`Vista adicional ${index + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
