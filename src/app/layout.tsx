import type { Metadata } from "next";
import { Tenor_Sans, Lora, Montserrat } from "next/font/google";
import "./globals.css";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";

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
  title: "Stephany Manzano",
  description: "Piezas artesanales hechas a mano para hogar.",
  icons: {
    icon: "/smhc_logo_nobg.png", // o "/logo.png" si usas otro formato
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${tenor.variable} ${lora.variable} ${montserrat.variable}`}
    >
      <body>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
