// Phone number is loaded from the .env file (VITE_WHATSAPP_NUMBER).
// .env is gitignored — it never gets committed to GitHub.
// Vite exposes VITE_* variables to the frontend bundle at build time.
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

if (!WHATSAPP_NUMBER) {
  console.warn(
    '[STAR] VITE_WHATSAPP_NUMBER is not set. ' +
    'Copy .env.example to .env and fill in your WhatsApp number.'
  );
}

/**
 * Generates a formatted WhatsApp message from cart items
 * and opens the WhatsApp click-to-chat URL.
 *
 * @param {Array} cartItems - Array of cart item objects
 */
export function openWhatsAppOrder(cartItems) {
  if (!cartItems || cartItems.length === 0) return;

  const lines = cartItems.map((item, index) => {
    const variantLabel = item.selectedVariant ? ` ${item.selectedVariant.label}` : '';
    const itemTotal = item.price * item.quantity;
    return `${index + 1}. ${item.name}${variantLabel} × ${item.quantity} = ₹${itemTotal}`;
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = [
    'Hello STAR,',
    '',
    'I would like to place an order.',
    '',
    'Products:',
    ...lines,
    '',
    `Total Amount: ₹${total}`,
    '',
    'Please contact me regarding this order.',
  ].join('\n');

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Direct WhatsApp link (no message) — used for general contact CTA
 */
export function getWhatsAppLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}
