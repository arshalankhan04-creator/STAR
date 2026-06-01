const WHATSAPP_NUMBER = '919328798087'; // +91 India

/**
 * Generates a beautifully formatted WhatsApp order message
 * and opens the WhatsApp click-to-chat URL.
 *
 * @param {Array} cartItems - Array of cart item objects
 */
export function openWhatsAppOrder(cartItems) {
  if (!cartItems || cartItems.length === 0) return;

  const itemLines = cartItems.map((item) => {
    const variant = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
    const subtotal = item.price * item.quantity;
    return `  • ${item.name}${variant}\n    Qty: ${item.quantity}  ×  ₹${item.price}  =  *₹${subtotal}*`;
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const message = [
    '╔══════════════════════╗',
    '       🌿 *STAR Herbal*',
    '       _New Order Request_',
    '╚══════════════════════╝',
    '',
    '🛒 *Order Summary*',
    '─────────────────────────',
    ...itemLines,
    '─────────────────────────',
    `📦 Items: ${itemCount}`,
    `💰 *Total: ₹${total}*`,
    '─────────────────────────',
    '',
    '📍 *Delivery Details*',
    'Name: ',
    'Address: ',
    'City / Pincode: ',
    '',
    '─────────────────────────',
    '🙏 _Thank you for choosing STAR Herbal!_',
    '_We will confirm your order shortly._',
  ].join('\n');

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Direct WhatsApp link (no message) — used for general contact CTA
 */
export function getWhatsAppLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}
