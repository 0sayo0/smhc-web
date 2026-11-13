"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// ========================================
// TYPES
// ========================================

export interface ProductGalleryImage {
  src: string;
  thumbnailSrc: string;
  alt: string;
}

interface ProductGalleryProps {
  productName: string;
  images: ProductGalleryImage[];
}

// ========================================
// COMPONENT
// ========================================

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const hasMultipleImages = images.length > 1;

  // ========================================
  // NAVIGATION
  // ========================================

  const changeImage = (direction: number) => {
    setActiveIndex((current) => {
      return (current + direction + images.length) % images.length;
    });
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!hasMultipleImages) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeImage(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeImage(-1);
    }
  };

  // ========================================
  // EMPTY GALLERY
  // ========================================

  if (images.length === 0) {
    return (
      <div className="flex aspect-4/5 items-center justify-center bg-warm px-8 text-center">
        <p className="font-editorial text-base italic text-coal/55">
          Fotografía próximamente disponible.
        </p>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-5">
      {/* =====================================
          MAIN IMAGE
         ===================================== */}

      <div className="relative aspect-4/5 overflow-hidden bg-warm">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeImage.src}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.28,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 52vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* IMAGE INDEX */}

        <div className="absolute left-5 top-5 bg-cream/95 px-4 py-3 sm:left-7 sm:top-7">
          <span className="font-system text-[10px] font-semibold tracking-[0.18em] text-coal">
            {String(activeIndex + 1).padStart(2, "0")}
            {" / "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

        {/* EXPAND IMAGE */}

        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-label={`Ampliar fotografía de ${productName}`}
          className="group absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center bg-cream text-coal transition-colors duration-300 hover:bg-coal hover:text-cream sm:bottom-7 sm:right-7"
        >
          <Expand aria-hidden="true" size={19} strokeWidth={1.5} />
        </button>
      </div>

      {/* =====================================
          THUMBNAILS
         ===================================== */}

      {hasMultipleImages && (
        <div
          role="group"
          aria-label={`Fotografías de ${productName}`}
          className="flex gap-3 overflow-x-auto pb-2"
        >
          {images.map((image, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={`${image.thumbnailSrc}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Mostrar fotografía ${index + 1} de ${images.length}`}
                aria-pressed={isActive}
                className={`
                  relative
                  h-24
                  w-20

                  shrink-0

                  overflow-hidden

                  border-2

                  transition-[border-color,opacity]
                  duration-300

                  ${
                    isActive
                      ? "border-terracotta opacity-100"
                      : "border-transparent opacity-65 hover:opacity-100"
                  }
                `}
              >
                <Image
                  src={image.thumbnailSrc}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* IMAGE CAPTION */}

      <div className="flex items-center justify-between gap-4 border-t border-coal/10 pt-4">
        <p className="font-editorial text-sm italic text-coal/60">
          Cada detalle cuenta.
        </p>

        {hasMultipleImages && (
          <span
            aria-live="polite"
            className="font-system text-[10px] tracking-[0.15em] text-coal/60"
          >
            {activeIndex + 1} de {images.length}
          </span>
        )}
      </div>

      {/* =====================================
          EXPANDED IMAGE DIALOG
         ===================================== */}

      <dialog
        ref={dialogRef}
        aria-label={`Galería ampliada de ${productName}`}
        onKeyDown={handleDialogKeyDown}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
        className="
          m-auto

          h-[90dvh]
          w-[95vw]

          max-h-none
          max-w-300

          overflow-hidden

          bg-cream
          p-4

          text-coal

          backdrop:bg-coal/90

          sm:p-6
        "
      >
        <div className="flex h-full flex-col">
          {/* MODAL HEADER */}

          <div className="mb-4 flex shrink-0 items-center justify-between gap-5">
            <span className="font-system text-[10px] font-semibold uppercase tracking-[0.15em] text-coal/70">
              {productName}
            </span>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Cerrar fotografía ampliada"
              className="flex h-11 w-11 shrink-0 items-center justify-center text-coal transition-colors hover:text-terracotta"
            >
              <X aria-hidden="true" size={23} strokeWidth={1.5} />
            </button>
          </div>

          {/* EXPANDED PHOTOGRAPH */}

          <div className="relative min-h-0 flex-1">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(max-width: 767px) 95vw, 1100px"
              className="object-contain"
            />
          </div>

          {/* MODAL CONTROLS */}

          <div className="mt-4 flex shrink-0 items-center justify-between border-t border-coal/10 pt-4">
            <button
              type="button"
              onClick={() => changeImage(-1)}
              disabled={!hasMultipleImages}
              aria-label="Fotografía anterior"
              className="flex h-11 w-11 items-center justify-center text-coal transition-colors hover:text-terracotta disabled:opacity-30"
            >
              <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.5} />
            </button>

            <span className="font-system text-[10px] tracking-[0.15em] text-coal/65">
              {activeIndex + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={() => changeImage(1)}
              disabled={!hasMultipleImages}
              aria-label="Fotografía siguiente"
              className="flex h-11 w-11 items-center justify-center text-coal transition-colors hover:text-terracotta disabled:opacity-30"
            >
              <ChevronRight aria-hidden="true" size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
