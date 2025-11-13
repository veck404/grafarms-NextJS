export const WHATSAPP_NUMBER = "2348055112729";

export const buildWhatsAppCheckoutLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
