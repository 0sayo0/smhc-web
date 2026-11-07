import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { urlFor } from "@/lib/sanity";

import type { CatalogCategory } from "@/lib/catalog";

interface CategoryCardProps {
  category: CatalogCategory;
  href: string;
  index: number;
}

export function CategoryCard({ category, href, index }: CategoryCardProps) {
  const hasImage = Boolean(category.coverImage?.asset);

  return (
    <Link href={href} className="group block">
      {/* EDITORIAL IMAGE AREA */}

      <div
        className="
          relative
          aspect-[4/4.5]
          overflow-hidden
          bg-warm
        "
      >
        {hasImage && category.coverImage ? (
          <Image
            src={urlFor(category.coverImage)
              .width(1200)
              .quality(85)
              .auto("format")
              .url()}
            alt={category.coverImage.alt || category.name}
            fill
            sizes="
              (max-width: 767px) 100vw,
              (max-width: 1279px) 50vw,
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
              absolute inset-0

              flex flex-col
              items-center justify-center

              bg-warm

              px-8 text-center
            "
          >
            <span
              className="
                font-editorial
                text-[11px]
                italic

                text-terracotta
              "
            >
              Stephany Manzano
            </span>

            <span
              className="
                mt-7

                font-brand
                text-[clamp(2rem,4vw,3.7rem)]
                leading-tight

                text-coal
              "
            >
              {category.name}
            </span>

            <span
              aria-hidden="true"
              className="
                mt-9
                h-px w-12
                bg-terracotta
              "
            />
          </div>
        )}

        {/* CATEGORY INDEX */}

        <div
          className="
            absolute
            left-6
            top-6

            bg-cream/95
            px-4
            py-3
          "
        >
          <span
            className="
              font-system
              text-[10px]
              tracking-[0.15em]

              text-coal
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ARROW */}

        <div
          className="
            absolute
            right-6
            bottom-6

            flex
            h-12 w-12
            items-center justify-center

            bg-cream

            text-coal

            transition-colors
            duration-300

            group-hover:bg-coal
            group-hover:text-cream
          "
        >
          <ArrowUpRight
            aria-hidden="true"
            size={20}
            strokeWidth={1.5}
            className="
              transition-transform
              duration-300

              motion-safe:group-hover:-translate-y-0.5
              motion-safe:group-hover:translate-x-0.5
            "
          />
        </div>
      </div>

      {/* CATEGORY INFORMATION */}

      <div className="pt-7">
        <span
          className="
            font-system
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]

            text-terracotta
          "
        >
          Home Collection
        </span>

        <h3
          className="
            mt-3

            font-brand
            text-2xl
            md:text-3xl

            text-coal

            transition-colors
            duration-300

            group-hover:text-terracotta
          "
        >
          {category.name}
        </h3>

        {category.description && (
          <p
            className="
              mt-4
              max-w-md

              font-editorial
              text-sm
              leading-7

              text-coal/65
            "
          >
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
