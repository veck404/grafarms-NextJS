export const WHATSAPP_NUMBER = "2347017567105";

export const buildWhatsAppCheckoutLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
