import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { urlFor } from "@/lib/sanity";

import type { EditorialCollection } from "@/lib/collections";

interface CollectionCardProps {
  collection: EditorialCollection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  const hasImage = Boolean(collection.coverImage?.asset);

  const label =
    collection.eyebrow ||
    (collection.kind === "seasonal"
      ? "Edición de temporada"
      : "Colección permanente");

  return (
    <article className="group">
      <Link
        href={`/colecciones/${collection.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
      >
        <div className="relative isolate aspect-5/4 overflow-hidden bg-warm sm:aspect-6/5">
          {hasImage && collection.coverImage ? (
            <>
              <Image
                src={urlFor(collection.coverImage)
                  .width(1400)
                  .quality(85)
                  .auto("format")
                  .url()}
                alt={collection.coverImage.alt || collection.name}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.045]"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-coal/80 via-coal/10 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
              <span className="font-editorial text-sm italic text-terracotta">
                Stephany Manzano
              </span>

              <span className="mt-8 max-w-md font-brand text-4xl leading-tight text-coal md:text-5xl">
                {collection.name}
              </span>

              <span
                aria-hidden="true"
                className="mt-8 h-px w-14 bg-terracotta"
              />
            </div>
          )}

          <div
            className={`absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4 sm:bottom-10 sm:left-10 sm:right-10 ${
              hasImage ? "text-cream" : "text-coal"
            }`}
          >
            <div>
              <span className="font-system text-[10px] uppercase tracking-[0.22em]">
                {String(index + 1).padStart(2, "0")} / SMHC
              </span>

              {hasImage && (
                <h2 className="mt-3 font-brand text-3xl leading-tight md:text-4xl">
                  {collection.name}
                </h2>
              )}
            </div>

            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center ${
                hasImage ? "bg-cream text-coal" : "bg-coal text-cream"
              }`}
            >
              <ArrowUpRight
                aria-hidden="true"
                size={20}
                strokeWidth={1.4}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>

        <div className="pt-7">
          <p className="font-system text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta">
            {label}
          </p>

          {!hasImage && (
            <h2 className="mt-3 font-brand text-2xl text-coal">
              {collection.name}
            </h2>
          )}

          {collection.description && (
            <p className="mt-4 max-w-xl font-editorial text-base leading-7 text-coal/70">
              {collection.description}
            </p>
          )}

          <span className="mt-6 inline-block border-b border-coal/30 pb-2 font-system text-[10px] font-semibold uppercase tracking-[0.17em] text-coal transition-colors group-hover:border-terracotta group-hover:text-terracotta">
            Explorar colección
          </span>
        </div>
      </Link>
    </article>
  );
}
