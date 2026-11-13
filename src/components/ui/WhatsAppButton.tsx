import { MessageCircleMore } from "lucide-react";

import { getWhatsappUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const whatsappUrl = getWhatsappUrl(
    "Hola, me gustaría conocer más sobre las piezas de Stephany Manzano Home Collection.",
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a SMHC por WhatsApp"
      className="
        fixed
        bottom-5
        right-5
        z-40

        flex
        h-14
        w-14

        items-center
        justify-center

        rounded-full

        bg-coal
        text-cream

        shadow-[0_8px_30px_-12px_rgba(56,56,56,0.4)]

        transition-[background-color,transform]
        duration-300

        smhc-press

        hover:bg-terracotta

        motion-safe:hover:-translate-y-1

        sm:bottom-7
        sm:right-7
        sm:h-15
        sm:w-15
      "
    >
      <MessageCircleMore aria-hidden="true" size={28} strokeWidth={1.5} />
    </a>
  );
}
