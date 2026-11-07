import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { urlFor } from "@/lib/sanity";

import type { CatalogProduct } from "@/lib/catalog";

interface ProductCardProps {
  product: CatalogProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasImage = Boolean(product.mainImage?.asset);

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        {/* IMAGE */}

        <div
          className="
            relative
            aspect-3/4
            overflow-hidden

            bg-warm
          "
        >
          {hasImage && product.mainImage ? (
            <Image
              src={urlFor(product.mainImage).width(900).height(1200).url()}
              alt={product.mainImage.alt || product.name}
              fill
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1023px) 50vw,
                33vw
              "
              className="
                object-cover

                transition-transform
                duration-1000
                ease-out

                motion-safe:group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                absolute inset-0

                flex
                items-center
                justify-center

                p-8
                text-center
              "
            >
              <span
                className="
                  font-editorial
                  text-sm
                  italic

                  text-coal/45
                "
              >
                Fotografía próximamente
              </span>
            </div>
          )}

          {/* CATEGORY LABEL */}

          {product.categoryName && (
            <div
              className="
                absolute
                left-4
                top-4

                bg-cream/95

                px-4
                py-3
              "
            >
              <span
                className="
                  font-system
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]

                  text-coal
                "
              >
                {product.categoryName}
              </span>
            </div>
          )}
        </div>

        {/* INFORMATION */}

        <div className="pt-6">
          {product.collectionName && (
            <span
              className="
                font-system
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]

                text-terracotta
              "
            >
              {product.collectionName}
            </span>
          )}

          <h3
            className="
              mt-3

              font-brand
              text-xl
              md:text-2xl

              leading-snug

              text-coal

              transition-colors
              duration-300

              group-hover:text-terracotta
            "
          >
            {product.name}
          </h3>

          {(product.purpose || product.description) && (
            <p
              className="
                mt-3

                line-clamp-2

                font-editorial
                text-sm
                italic
                leading-6

                text-coal/65
              "
            >
              {product.purpose || product.description}
            </p>
          )}

          <span
            className="
              mt-6

              inline-flex
              items-center
              gap-3

              border-b
              border-coal/25

              pb-2

              font-system
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]

              text-coal

              transition-colors
              duration-300

              group-hover:border-terracotta
              group-hover:text-terracotta
            "
          >
            Descubrir pieza
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </article>
  );
}
