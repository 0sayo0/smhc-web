import { client, urlFor } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "next/image";
import Link from "next/link";

interface CatalogProduct {
  _id: string;
  name: string;
  slug: { current: string };
  mainImage: any;
  purpose?: string;
  description: string;
  collectionName: string;
  categoryName: string;
}

// 1. Consulta GROQ: Traemos todos los productos de esta categoría, ordenados alfabéticamente por colección
async function getCategoryProducts(slug: string) {
  const query = `*[_type == "product" && category->slug.current == "${slug}"] | order(collection->name asc, name asc) {
    _id,
    name,
    slug,
    mainImage,
    purpose,
    description,
    "collectionName": collection->name,
    "categoryName": category->name
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export async function generateStaticParams() {
  const query = `*[_type == "category"]{ "slug": slug.current }`;
  const categories = await client.fetch(query);
  return categories.map((cat: any) => ({
    slug: cat.slug,
  }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products: CatalogProduct[] = await getCategoryProducts(slug);

  if (!products || products.length === 0) {
    return (
      <main className="min-h-screen bg-cream pt-40 pb-20 flex items-center justify-center">
        <h1 className="font-brand text-3xl text-coal">
          Colección en preparación.
        </h1>
      </main>
    );
  }

  const categoryTitle = products[0].categoryName;

  // 2. Lógica de Agrupación: Ordenamos las velas en bloques según su colección
  const groupedProducts = products.reduce(
    (acc: Record<string, CatalogProduct[]>, product) => {
      // Si la pieza no tiene colección asignada, la mandamos a una general
      const colName = product.collectionName || "Edición Especial";
      if (!acc[colName]) {
        acc[colName] = [];
      }
      acc[colName].push(product);
      return acc;
    },
    {},
  );

  const collections = Object.keys(groupedProducts);

  return (
    <main className="min-h-screen bg-cream pb-32">
      {/* HEADER DE LA CATEGORÍA */}
      <section className="pt-32 lg:pt-56 pb-12 text-center px-4">
        <Container>
          <FadeIn>
            <span className="text-terracotta text-[10px] font-system font-bold uppercase tracking-[0.4em] mb-4 block">
              Catálogo Completo
            </span>
            <h1 className="font-brand text-4xl md:text-5xl lg:text-7xl text-coal tracking-wide">
              {categoryTitle}
            </h1>
          </FadeIn>
        </Container>
      </section>

      {/* SUB-MENÚ STICKY (Se pega a ras de techo) */}
      <div className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-coal/10 shadow-sm mb-16 transition-all duration-300">
        <Container>
          <div className="flex items-center justify-start md:justify-center overflow-x-auto hide-scrollbar py-4 gap-8 px-4 md:px-0">
            {collections.map((collectionName) => {
              const sectionId = collectionName
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .toLowerCase();
              return (
                <a
                  key={collectionName}
                  href={`#${sectionId}`}
                  className="text-[10px] md:text-xs font-system font-bold uppercase tracking-[0.2em] text-coal/60 hover:text-terracotta transition-colors whitespace-nowrap"
                >
                  {collectionName}
                </a>
              );
            })}
          </div>
        </Container>
      </div>

      {/* BLOQUES DE COLECCIONES (El Grid curado) */}
      <Container>
        {Object.entries(groupedProducts).map(
          ([collectionName, items], index) => {
            const sectionId = collectionName
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "-")
              .toLowerCase();

            return (
              <section
                key={collectionName}
                id={sectionId}
                // scroll-mt-32 evita que el sub-menú tape el título al hacer clic
                className={`scroll-mt-32 ${index > 0 ? "mt-24 md:mt-32 pt-16 border-t border-coal/10" : ""}`}
              >
                <FadeIn>
                  <div className="flex flex-col items-center mb-16">
                    <h2 className="font-brand text-2xl md:text-4xl text-coal tracking-[0.1em]">
                      {collectionName}
                    </h2>
                    <div className="w-8 h-[1px] bg-terracotta mt-6"></div>
                  </div>

                  {/* EL GRID DE PRODUCTOS (3 Columnas en Desktop) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {items.map((product) => (
                      <div
                        key={product._id}
                        className="group/card flex flex-col items-center text-center"
                      >
                        <Link
                          href={`/product/${product.slug.current}`}
                          className="w-full flex flex-col items-center cursor-pointer"
                        >
                          {/* Imagen con Aspect Ratio de Galería */}
                          <div className="relative w-full aspect-[3/4] overflow-hidden bg-transparent mb-8">
                            {product.mainImage && (
                              <Image
                                src={urlFor(product.mainImage)
                                  .width(800)
                                  .height(1066)
                                  .url()}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
                              />
                            )}
                          </div>

                          {/* Tipografía Editorial */}
                          <h3 className="text-xl md:text-2xl font-brand text-coal mb-3">
                            {product.name}
                          </h3>
                          <p className="text-sm font-editorial italic text-coal/70 mb-5 line-clamp-2 px-4">
                            {product.purpose || product.description}
                          </p>

                          <span className="text-[10px] text-coal uppercase tracking-widest border-b border-transparent group-hover/card:text-terracotta group-hover/card:border-terracotta group-hover/card:font-bold transition-all duration-300 pb-1">
                            Ver pieza
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </section>
            );
          },
        )}
      </Container>
    </main>
  );
}
