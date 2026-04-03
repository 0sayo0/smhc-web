import { client, urlFor } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Carousel } from "@/components/ui/Carousel";
import Image from "next/image";
import Link from "next/link";

// 1. Nuevas interfaces para soportar la estructura del Curador
interface Product {
  _id: string;
  name: string;
  description: string;
  purpose?: string;
  mainImage: any;
  slug: { current: string };
}

interface CarouselSection {
  categoryName: string;
  categorySlug: string;
  selectedProducts: Product[];
}

// 2. Consulta GROQ Avanzada: Trae las vitrinas, expande el nombre de la categoría y los productos seleccionados
async function getHomeData() {
  const query = `*[_type == "homeCurator"][0] {
    carousels[] {
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      selectedProducts[]-> {
        _id,
        name,
        description,
        purpose, 
        mainImage,
        slug
      }
    }
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function Home() {
  // 3. Ejecutamos la consulta
  const homeData = await getHomeData();
  const carousels: CarouselSection[] = homeData?.carousels || [];

  return (
    <main className="min-h-screen bg-cream selection:bg-terracotta selection:text-white pb-32">
      {/* 1. HERO ENMARCADO Y PROPORCIONADO */}
      <section className="pt-40 md:pt-48 pb-16 px-6 md:px-12 flex justify-center items-center w-full">
        <div className="relative w-full max-w-6xl aspect-[4/5] md:aspect-[21/12] overflow-hidden bg-coal/5 shadow-sm group">
          <Image
            src="/hero-smhc.webp"
            alt="Stephany Manzano Home Collection"
            fill
            priority
            className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[20s] ease-out filter-hero"
          />

          <div className="absolute inset-0 bg-coal/20 bg-gradient-to-t from-coal/60 via-coal/10 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <FadeIn>
              <span className="text-cream/90 text-[10px] md:text-xs font-system font-bold uppercase tracking-[0.4em] mb-4 block drop-shadow-md">
                Nueva Colección
              </span>
              <h2 className="font-brand text-4xl md:text-5xl lg:text-6xl text-cream mb-8 tracking-wide drop-shadow-lg max-w-3xl">
                La luz transformada en arte.
              </h2>

              {/* El botón ahora apunta dinámicamente a la primera vitrina */}
              <a
                href="#vitrina-0"
                className="inline-block bg-cream text-coal px-8 py-3.5 text-[10px] md:text-xs font-system font-bold uppercase tracking-[0.2em] hover:bg-coal hover:text-cream transition-colors duration-500 shadow-xl"
              >
                Descubrir Piezas
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. EL MANIFIESTO */}
      <section className="py-20 text-center px-4">
        <Container>
          <FadeIn>
            <h2 className="font-brand text-2xl md:text-4xl text-coal mb-6 leading-tight max-w-3xl mx-auto tracking-wide">
              El arte de la luz y la naturaleza encapsulada.
            </h2>
            <p className="font-editorial text-base md:text-lg text-coal/60 max-w-2xl mx-auto leading-relaxed italic">
              Cada pieza es creada con intención y delicadeza. Desde la calidez
              de nuestras velas de cera de soya artesanal, hasta la eternidad
              encapsulada en cada Gran Jardín Eterno.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* 3. VITRINAS DINÁMICAS (Iteramos sobre los datos de Sanity) */}
      {carousels.map((carousel, index) => (
        <section
          key={index}
          id={`vitrina-${index}`}
          className="py-16 scroll-mt-24"
        >
          <Container>
            <FadeIn>
              <div className="flex flex-col items-center mb-16">
                <h3 className="font-brand text-2xl md:text-3xl tracking-[0.15em] text-coal uppercase">
                  {carousel.categoryName}
                </h3>
                <div className="w-12 h-[1px] bg-coal/20 mt-6"></div>
              </div>
            </FadeIn>
          </Container>

          <Carousel>
            {carousel.selectedProducts.map((product) => (
              <div
                key={product._id}
                className="min-w-[65vw] md:min-w-[28vw] lg:min-w-[18vw] snap-center group/card"
              >
                <Link
                  href={`/product/${product.slug.current}`}
                  className="flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-transparent mb-8">
                    {product.mainImage && (
                      <Image
                        src={urlFor(product.mainImage)
                          .width(800)
                          .height(1066)
                          .url()}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
                      />
                    )}
                  </div>

                  <h4 className="text-xl font-brand text-coal mb-2">
                    {product.name}
                  </h4>
                  <p className="text-sm font-editorial italic text-coal/70 mb-4 line-clamp-1 px-4">
                    {product.purpose || product.description}
                  </p>

                  <span className="text-[10px] text-coal/90 font-semibold uppercase tracking-widest border-b border-transparent group-hover/card:text-terracotta group-hover/card:border-terracotta transition-colors duration-300 pb-0.5">
                    Ver pieza
                  </span>
                </Link>
              </div>
            ))}

            {/* Tarjeta de "Ver Toda la Colección" dinámica */}
            <div className="min-w-[65vw] md:min-w-[28vw] lg:min-w-[18vw] snap-center flex items-center justify-center border border-coal/10 hover:bg-coal group/link transition-colors duration-500 cursor-pointer">
              <Link
                href={`/coleccion/${carousel.categorySlug}`}
                className="w-full h-full flex flex-col items-center justify-center py-28"
              >
                <div className="w-8 h-[1px] bg-coal group-hover/link:bg-cream mb-4 transition-colors"></div>
                <span className="text-[10px] md:text-xs font-system uppercase tracking-widest font-semibold text-coal group-hover/link:text-cream transition-colors px-4 text-center">
                  Descubrir más
                </span>
              </Link>
            </div>
          </Carousel>
        </section>
      ))}

      {/* 4. BODEGÓN HÍBRIDO: CERA AROMÁTICA */}
      <section className="py-24 px-6 md:px-12 max-w-[85rem] mx-auto mt-10">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-0 order-2 md:order-1">
              <span className="text-terracotta text-xs font-system font-bold uppercase tracking-[0.3em] mb-4 block">
                Próximamente
              </span>
              <h3 className="font-brand text-4xl md:text-5xl text-coal mb-6">
                Cera Aromática
              </h3>
              <p className="font-editorial text-lg text-coal/60 italic mb-10 max-w-md leading-relaxed">
                Luz y esencia en perfecta armonía. Una colección diseñada para
                encenderse, iluminar tus momentos y liberar notas olfativas
                intensas que transforman la atmósfera de tu hogar.
              </p>

              <Link
                href="/contacto"
                className="text-[10px] font-system uppercase tracking-widest border-b border-coal pb-1 hover:text-terracotta hover:border-terracotta transition-colors"
              >
                Recibir notificación
              </Link>
            </div>

            <div className="relative w-full aspect-[4/5] overflow-hidden bg-coal/5 order-1 md:order-2">
              <Image
                src="https://images.pexels.com/photos/7004676/pexels-photo-7004676.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Colección Cera Aromática"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5. BODEGÓN HÍBRIDO: PIEDRA ESCULTURAL */}
      <section className="py-24 px-6 md:px-12 max-w-[85rem] mx-auto mt-10">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-coal/5">
              <Image
                src="https://images.pexels.com/photos/4207788/pexels-photo-4207788.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Ambiente Stephany Manzano"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-0">
              <span className="text-terracotta text-xs font-system font-bold uppercase tracking-[0.3em] mb-4 block">
                Próximamente
              </span>
              <h3 className="font-brand text-4xl md:text-5xl text-coal mb-6">
                Piedra Escultural
              </h3>
              <p className="font-editorial text-lg text-coal/60 italic mb-10 max-w-md leading-relaxed">
                La solidez de los minerales transformada en siluetas suaves y
                atemporales. Macetas esculturales creadas para albergar vida con
                la más pura elegancia.
              </p>

              <Link
                href="/contacto"
                className="text-[10px] font-system uppercase tracking-widest border-b border-coal pb-1 hover:text-terracotta hover:border-terracotta transition-colors"
              >
                Recibir notificación
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
