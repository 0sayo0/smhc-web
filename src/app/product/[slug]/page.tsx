import { client } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductDetail {
  _id: string;
  name: string;
  slug: { current: string };
  mainImage: any;
  gallery: any[];
  category: { name: string };
  collection: { name: string };
  dimensions: string;
  material: string[];
  purpose?: string; // <-- AGREGADO: El nuevo campo
  story: any;
  whatsappMessage: string;
  inStock: boolean;
}

async function getProduct(slug: string) {
  // AGREGADO: Pedimos 'purpose' a Sanity
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    name,
    slug,
    mainImage,
    gallery,
    category->{name},
    collection->{name},
    dimensions,
    material,
    purpose, 
    story,
    whatsappMessage,
    inStock
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export async function generateStaticParams() {
  const query = `*[_type == "product"]{ "slug": slug.current }`;
  const products = await client.fetch(query);
  return products.map((product: any) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product: ProductDetail = await getProduct(slug);

  if (!product) {
    return (
      <div className="py-20 text-center text-coal">Producto no encontrado.</div>
    );
  }

  const phoneNumber = "5214612771367";
  const encodedMessage = encodeURIComponent(
    `${product.whatsappMessage} ${product.name}`,
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    // AGREGADO: Protección de Navbar (pt-32 lg:pt-40) y quitamos márgenes top innecesarios
    <main className="min-h-screen bg-cream pt-32 lg:pt-56 pb-20">
      <Container>
        <FadeIn>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-system text-coal/60 hover:text-terracotta transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Regresar a la Boutique
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* COLUMNA IZQUIERDA: Galería Interactiva */}
          <div>
            <ProductGallery
              mainImage={product.mainImage}
              gallery={product.gallery}
            />
          </div>

          {/* COLUMNA DERECHA: Info */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <div className="text-xs font-bold tracking-widest text-terracotta uppercase mb-4">
                {product.category?.name} — {product.collection?.name}
              </div>

              <h1 className="text-4xl md:text-5xl font-brand text-coal mb-4">
                {product.name}
              </h1>

              {/* AGREGADO: El Propósito renderizado como subtítulo editorial */}
              {product.purpose && (
                <p className="font-editorial text-lg text-coal/60 italic mb-6">
                  {product.purpose}
                </p>
              )}

              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm font-system text-coal/70 mb-8 border-y border-coal/10 py-6 mt-2">
                {product.dimensions && (
                  <span>
                    <strong className="tracking-wide">Medidas:</strong>{" "}
                    {product.dimensions}
                  </span>
                )}
                {product.material && (
                  <span>
                    <strong className="tracking-wide">Material:</strong>{" "}
                    {product.material.join(", ")}
                  </span>
                )}
              </div>

              <div className="prose prose-p:font-editorial prose-p:text-coal/80 prose-headings:font-brand prose-a:text-terracotta mb-10">
                {product.story ? (
                  <PortableText value={product.story} />
                ) : (
                  <p className="italic text-coal/50">
                    Una pieza única hecha a mano...
                  </p>
                )}
              </div>

              {/* TU BOTÓN ORIGINAL INTACTO */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-terracotta text-cream font-system font-medium py-4 px-8 hover:bg-coal transition-colors duration-300 tracking-wide"
              >
                PEDIR POR WHATSAPP
              </a>
              <p className="text-center text-xs text-coal/40 mt-3 font-system">
                * Piezas bajo pedido. Hablemos para personalizar tu entrega.
              </p>
            </FadeIn>
          </div>
        </div>
      </Container>
    </main>
  );
}
