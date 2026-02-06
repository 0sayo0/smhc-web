import { client, urlFor } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "next/image";
import Link from "next/link"; // <--- 1. IMPORTANTE: Importamos el Link

// 1. Definimos la forma del producto
interface Product {
  _id: string;
  name: string;
  description: string;
  mainImage: any;
  slug: { current: string };
}

// 2. Función para pedir datos a Sanity
async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    description,
    mainImage,
    slug
  }`;
  return client.fetch(query);
}

export default async function Home() {
  // 3. Obtenemos los productos
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen bg-cream">
      <Container>
        {/* Hero Section */}
        <div className="py-24 text-center">
          <FadeIn>
            <img
              src="/smhc_logo_nobg.png"
              alt="Stephany Manzano HC"
              className="w-20 md:w-32 mx-auto mb-2"
            />
            <h1 className="font-brand text-5xl md:text-7xl text-coal mb-6">
              Stephany Manzano
            </h1>
            <p className="font-editorial text-xl text-terracotta italic">
              Home Collection
            </p>
          </FadeIn>
        </div>

        {/* Grid de Productos */}
        <div className="pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <FadeIn key={product._id}>
              {/* 2. IMPORTANTE: Envolvemos todo el card en un Link dinámico */}
              <Link href={`/product/${product.slug.current}`}>
                <div className="group cursor-pointer">
                  {/* Imagen */}
                  <div className="relative aspect-4/5 overflow-hidden bg-white/50 mb-4">
                    {product.mainImage && (
                      <Image
                        src={urlFor(product.mainImage)
                          .width(600)
                          .height(750)
                          .url()}
                        alt={product.name}
                        fill
                        sizes="100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Textos */}
                  <h3 className="text-2xl font-brand text-coal">
                    {product.name}
                  </h3>
                  <p className="text-sm font-editorial text-coal/70 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Botón visual */}
                  <div className="mt-3">
                    <span className="text-terracotta text-xs font-bold tracking-widest uppercase border-b border-terracotta pb-0.5">
                      Ver pieza
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </main>
  );
}
