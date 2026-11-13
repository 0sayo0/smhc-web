import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";

import { urlFor } from "@/lib/sanity";

import type { CatalogProduct } from "@/lib/catalog";

// ========================================
// TYPES
// ========================================

interface ProductCardProps {
  product: CatalogProduct;

  index?: number;
}

// ========================================
// COMPONENT
// ========================================

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const hasImage = Boolean(product.mainImage?.asset);

  const href = `/product/${encodeURIComponent(product.slug)}`;

  return (
    <FadeIn
      className="h-full"
      delay={Math.min(index * 0.075, 0.3)}
      duration={0.72}
      distance={18}
    >
      <article className="group h-full">
        <Link
          href={href}
          className="
          flex
          h-full
          flex-col

          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-terracotta
        "
        >
          {/* =====================================
            PRODUCT PHOTOGRAPHY
           ===================================== */}

          <div
            className="
            relative

            aspect-[4/5]

            overflow-hidden

            bg-warm
          "
          >
            {hasImage && product.mainImage ? (
              <Image
                src={urlFor(product.mainImage)
                  .width(960)
                  .height(1200)
                  .fit("crop")
                  .auto("format")
                  .url()}
                alt={product.mainImage.alt || product.name}
                fill
                sizes="
                (max-width: 639px) 85vw,
                (max-width: 1023px) 50vw,
                33vw
              "
                className="
                object-cover

                transition-transform
                duration-1000

                ease-out

                motion-safe:group-hover:scale-[1.045]
              "
              />
            ) : (
              <div
                className="
                absolute
                inset-0

                flex
                items-center
                justify-center

                bg-warm

                px-8
                text-center
              "
              >
                <span
                  className="
                  font-editorial
                  text-sm
                  italic

                  text-coal/50
                "
                >
                  Fotografía próximamente
                </span>
              </div>
            )}
          </div>

          {/* =====================================
            PRODUCT INFORMATION
           ===================================== */}

          <div
            className="
            flex
            flex-1
            flex-col

            pt-6
          "
          >
            {/* CATEGORY / COLLECTION */}

            <div
              className="
              flex
              flex-wrap
              items-center

              gap-x-3
              gap-y-2
            "
            >
              {product.collectionName && (
                <span
                  className="
                  font-system
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]

                  text-terracotta
                "
                >
                  {product.collectionName}
                </span>
              )}

              {product.categoryName && (
                <span
                  className="
                  font-system
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.12em]

                  text-coal/50
                "
                >
                  {product.collectionName && (
                    <span aria-hidden="true" className="mr-3">
                      /
                    </span>
                  )}

                  {product.categoryName}
                </span>
              )}
            </div>

            {/* PRODUCT NAME */}

            <h3
              className="
              mt-4

              font-brand

              text-xl
              leading-snug

              text-coal

              transition-colors
              duration-300

              group-hover:text-terracotta

              md:text-2xl
            "
            >
              {product.name}
            </h3>

            {/* PRODUCT DESCRIPTION */}

            {(product.purpose || product.description) && (
              <p
                className="
                mt-3

                line-clamp-2

                font-editorial
                text-sm
                italic
                leading-7

                text-coal/65
              "
              >
                {product.purpose || product.description}
              </p>
            )}

            {/* EDITORIAL LINK */}

            <span
              className="
              mt-auto
              pt-7

              inline-flex
              items-center
              gap-3

              self-start

              border-b
              border-coal/30

              pb-2

              font-system
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]

              text-coal

              transition-colors
              duration-300

              group-hover:border-terracotta
              group-hover:text-terracotta
            "
            >
              Descubrir pieza
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                strokeWidth={1.5}
                className="
                transition-transform
                duration-300

                motion-safe:group-hover:-translate-y-0.5
                motion-safe:group-hover:translate-x-0.5
              "
              />
            </span>
          </div>
        </Link>
      </article>
    </FadeIn>
  );
}
