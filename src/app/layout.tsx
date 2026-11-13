import type { Metadata } from "next";
import { Tenor_Sans, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"; // Ajusta la ruta si es necesario
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getNavigationCategories } from "@/lib/navigation";

const tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tenor",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stephanymanzano.com"),

  title: {
    default: "Stephany Manzano | Home Collection",
    template: "%s | Stephany Manzano",
  },

  description:
    "Descubre Stephany Manzano Home Collection: piezas artesanales de cera, diseño escultórico y objetos decorativos creados con intención para transformar tus espacios.",

  applicationName: "Stephany Manzano Home Collection",

  openGraph: {
    type: "website",
    locale: "es_MX",

    siteName: "Stephany Manzano Home Collection",

    title: "Stephany Manzano | Home Collection",

    description: "Arte, naturaleza y diseño artesanal para el hogar.",

    url: "/",

    images: [
      {
        url: "/hero-smhc.webp",
        alt: "Stephany Manzano Home Collection",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Stephany Manzano | Home Collection",

    description: "Piezas artesanales creadas para transformar tus espacios.",

    images: ["/hero-smhc.webp"],
  },

  icons: {
    icon: "/smhc_logo_nobg.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getNavigationCategories();

  return (
    <html
      lang="es"
      className={`${tenor.variable} ${lora.variable} ${montserrat.variable}`}
    >
      <body className="relative">
        <MotionProvider>
          {/* ACCESSIBILITY — SKIP LINK */}

          <a
            href="#contenido"
            className="
            sr-only

            fixed
            left-4
            top-4
            z-100

            bg-coal
            px-5
            py-3

            font-system
            text-sm
            text-cream

            focus:not-sr-only
          "
          >
            Saltar al contenido principal
          </a>

          {/* GLOBAL NAVIGATION */}

          <Navbar categories={categories} />

          {/* PAGE CONTENT */}

          <div id="contenido" tabIndex={-1} className="scroll-mt-24">
            {children}
          </div>

          {/* GLOBAL FOOTER */}

          <Footer />

          {/* CUSTOMER CONTACT */}

          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
