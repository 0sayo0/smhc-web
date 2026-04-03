import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import Link from "next/link";

export default function ContactoPage() {
  const phoneNumber = "5214612771367";
  const defaultMessage =
    "Hola,%20me%20gustaría%20saber%20más%20sobre%20las%20piezas%20de%20Stephany%20Manzano%20Home%20Collection.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  const instagramUrl = "https://www.instagram.com/stephanymanzano.mx/"; // Tu link real
  const tiktokUrl = "https://tiktok.com/@stephanymanzanohc"; // Tu link real

  return (
    <main className="min-h-screen bg-cream pt-40 pb-24 flex items-center justify-center selection:bg-terracotta selection:text-white">
      <Container className="text-center">
        <FadeIn>
          <span className="text-terracotta text-xs font-system font-bold uppercase tracking-[0.3em] mb-6 block">
            Atención Personalizada
          </span>
          <h1 className="font-brand text-4xl md:text-6xl text-coal mb-6">
            Contacto
          </h1>
          <p className="font-editorial text-lg md:text-xl text-coal/70 max-w-xl mx-auto mb-12 leading-relaxed">
            Mientras preparamos nuestro espacio digital de mensajería, estaremos
            encantados de brindarte atención directa y personal a través de
            WhatsApp.
          </p>

          {/* BOTÓN PRINCIPAL (WHATSAPP) */}
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 bg-coal text-cream px-10 py-5 text-xs font-system font-bold uppercase tracking-widest hover:bg-terracotta hover:scale-105 transition-all duration-500 shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Escríbenos por WhatsApp
          </Link>

          {/* REDES SOCIALES (Estilo minimalista) */}
          <div className="mt-16 flex flex-col items-center gap-6">
            <div className="w-12 h-[1px] bg-coal/10"></div>{" "}
            {/* Línea decorativa */}
            <span className="text-coal/50 text-[10px] font-system uppercase tracking-[0.2em]">
              O encuéntranos en
            </span>
            <div className="flex gap-8">
              {/* INSTAGRAM */}
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-coal hover:text-terracotta transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-xs font-system font-medium tracking-widest uppercase border-b border-transparent group-hover:border-terracotta pb-0.5">
                  Instagram
                </span>
              </Link>

              {/* TIKTOK */}
              {/* <Link
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-coal hover:text-terracotta transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
                <span className="text-xs font-system font-medium tracking-widest uppercase border-b border-transparent group-hover:border-terracotta pb-0.5">
                  TikTok
                </span>
              </Link> */}
            </div>
          </div>
        </FadeIn>
      </Container>
    </main>
  );
}
