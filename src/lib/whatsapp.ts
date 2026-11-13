const WHATSAPP_NUMBER = process.env.SMHC_WHATSAPP_NUMBER || "5214612771367";

export function getWhatsappUrl(message: string) {
  const phoneNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
