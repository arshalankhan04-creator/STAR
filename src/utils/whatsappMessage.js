const WHATSAPP_NUMBER = '919328798087'; // +91 India

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
    '🌿 *STAR Herbal — નવો ઓર્ડર*',
    '',
    'નમસ્તે Samim bhai,',
    'મારે નીચેના products મંગાવવા છે:',
    '',
    ...lines,
    '',
    `💰 *કુલ રકમ: ₹${total}*`,
    '',
    'કૃપા કરી મારો સંપર્ક કરો. આભાર 🙏',
  ].join('\n');

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Use a temporary anchor click instead of window.open()
  // — more reliable across browsers and not blocked by popup blockers
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
