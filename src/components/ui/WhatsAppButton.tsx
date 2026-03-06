import { MessageCircleMoreIcon } from "lucide-react";
import Link from "next/link";

export function WhatsAppButton() {
  // Reemplaza con tu número real
  const phoneNumber = "5214612771367";
  const message = "Hola! Me interesa una pieza de la colección.";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-18 h-18 bg-coal text-cream rounded-full shadow-lg hover:bg-terracotta transition-all hover:scale-105 duration-300"
      aria-label="Contactar por WhatsApp"
    >
      {/*WhatsApp icon*/}
      <MessageCircleMoreIcon size={35} />
    </Link>
  );
}
