import { client } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductGallery } from "@/components/product/ProductGallery"; // <--- IMPORTAMOS LA NUEVA GALERÍA
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
  story: any;
  whatsappMessage: string;
  inStock: boolean;
}

async function getProduct(slug: string) {
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
    story,
    whatsappMessage,
    inStock
  }`;
  return client.fetch(query);
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
    <main className="min-h-screen bg-cream py-12 md:py-20">
      <Container>
        <FadeIn>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-system text-coal/60 hover:text-terracotta transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* COLUMNA IZQUIERDA: Aquí usamos la nueva Galería Interactiva */}
          <div>
            <ProductGallery
              mainImage={product.mainImage}
              gallery={product.gallery}
            />
          </div>

          {/* COLUMNA DERECHA: Info (Igual que antes) */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <div className="text-xs font-bold tracking-widest text-terracotta uppercase mb-4">
                {product.category?.name} — {product.collection?.name}
              </div>

              <h1 className="text-4xl md:text-5xl font-brand text-coal mb-6">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm font-system text-coal/70 mb-8 border-y border-coal/10 py-4">
                {product.dimensions && (
                  <span>
                    <strong>Medidas:</strong> {product.dimensions}
                  </span>
                )}
                {product.material && (
                  <span>
                    <strong>Material:</strong> {product.material.join(", ")}
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
