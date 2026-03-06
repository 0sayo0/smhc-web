import { client, urlFor } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  mainImage: any;
  slug: { current: string };
}

async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    description,
    mainImage,
    slug
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen bg-cream selection:bg-terracotta selection:text-white">
      {/* 1. HERO SECTION INMERSIVO (Portada de Revista) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo de Pexels */}
        <Image
          src="/hero-smhc.webp"
          alt="Elegancia y luz"
          fill
          priority
          className="object-cover scale-100 animate-slow-pan filter-hero"
        />
        {/* Overlay oscuro/gradiente para que el texto resalte */}
        <div className="absolute inset-0 bg-coal/30 bg-gradient-to-t from-coal/60 via-transparent to-transparent"></div>

        {/* Contenido Central */}
        <div className="relative z-10 text-center text-cream px-4 -mt-1 md:-mt-14">
          <FadeIn>
            {/* LOGO DE REGRESO */}
            {/* Truco: Si tu logo original es negro, sobre esta foto oscura no se va a ver. 
                Le agregué "brightness-0 invert" para que Tailwind lo pinte de blanco automáticamente. 
                Si tu logo ya tiene letras blancas, quítale esas dos clases. */}
            <img
              src="/smhc_logo_nobg.png"
              alt="Stephany Manzano Logo"
              className="w-20 md:w-28 mx-auto mb-6 opacity-90 brightness-0 invert"
            />

            <h1 className="font-brand text-5xl md:text-7xl lg:text-8xl tracking-widest drop-shadow-md mb-4">
              Stephany Manzano
            </h1>
            <p className="font-editorial text-xl md:text-3xl italic tracking-wide text-cream/90">
              Home Collection
            </p>
          </FadeIn>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <span className="text-cream/70 text-xs font-system uppercase tracking-widest">
            Descubrir
          </span>
        </div>
      </section>

      {/* 2. EL MANIFIESTO (Respiro visual y Storytelling) */}
      <section className="py-32 bg-cream text-center px-4">
        <Container>
          <FadeIn>
            <span className="text-terracotta text-xs font-system font-bold uppercase tracking-[0.3em] mb-6 block">
              La Filosofía
            </span>
            <h2 className="font-brand text-3xl md:text-5xl text-coal mb-8 leading-tight max-w-3xl mx-auto">
              El arte de la luz y la naturaleza encapsulada.
            </h2>
            <p className="font-editorial text-lg md:text-xl text-coal/70 max-w-2xl mx-auto leading-relaxed">
              Cada pieza es creada con intención y delicadeza. Desde la calidez
              de nuestras velas de cera de soya artesanal, hasta la eternidad
              encapsulada en cada Gran Jardín Eterno. Una oda a la elegancia
              atemporal para tu hogar.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* 3. LA GALERÍA DE PIEZAS (Grid refinado con tus cards originales) */}
      <section className="pb-32 bg-cream">
        <Container>
          <FadeIn>
            <div className="flex justify-between items-end mb-16 border-b border-coal/10 pb-6">
              <h2 className="font-brand text-4xl text-coal">Colección</h2>
              <Link
                href="/"
                className="hidden md:inline-block font-system text-xs font-medium uppercase tracking-widest text-terracotta hover:text-coal transition-colors"
              >
                Ver todo
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <FadeIn key={product._id}>
                <Link href={`/product/${product.slug.current}`}>
                  <div className="group cursor-pointer">
                    {/* Imagen (Regresamos al aspect-4/5 y quitamos sombras pesadas) */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-white/50 mb-6">
                      {product.mainImage && (
                        <Image
                          src={urlFor(product.mainImage)
                            .width(800)
                            .height(1000)
                            .url()}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>

                    {/* Textos y Botón (Alineados a la izquierda como los tenías) */}
                    <div className="text-left">
                      <h3 className="text-2xl font-brand text-coal mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm font-editorial text-coal/70 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Botón visual "VER PIEZA" */}
                      <div className="mt-4">
                        <span className="text-terracotta text-xs font-bold tracking-widest uppercase border-b border-terracotta pb-0.5 group-hover:text-coal group-hover:border-coal transition-colors">
                          Ver pieza
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
