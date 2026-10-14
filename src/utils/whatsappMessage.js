const WHATSAPP_NUMBER = '919328798087'; // +91 India

/**
 * Formats a number as Indian Rupee string.
 */
function fmt(n) {
  return `₹${Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Generates a WhatsApp order message supporting mixed retail + wholesale carts.
 * Wholesale items show per-unit price, GST breakdown, and totals.
 * Retail items list qty only (prices confirmed by seller).
 *
 * @param {Array}  cartItems    - enriched cart items from CartContext
 * @param {Object} customerInfo - { name, phone, address, city, pincode, note }
 * @param {Object} totals       - { retailSubtotal, wholesaleSubtotalPreGst, wholesaleGstAmount, wholesaleSubtotalWithGst, grandTotal }
 */
export function openWhatsAppOrder(cartItems, customerInfo = {}, totals = {}) {
  if (!cartItems || cartItems.length === 0) return;

  const retailItems    = cartItems.filter((i) => i.pricingMode !== 'wholesale');
  const wholesaleItems = cartItems.filter((i) => i.pricingMode === 'wholesale');

  const lines = [];

  lines.push('╔══════════════════════╗');
  lines.push('       🌿 *STAR Herbal*');
  lines.push('       _New Order Request_');
  lines.push('╚══════════════════════╝');
  lines.push('');

  // ── Retail section ──────────────────────────────────────────────────────────
  if (retailItems.length > 0) {
    lines.push('🛒 *RETAIL ITEMS*');
    lines.push('─────────────────────────');
    retailItems.forEach((item) => {
      const variant = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
      lines.push(`  • ${item.name}${variant}`);
      lines.push(`    Qty: ${item.quantity}`);
    });
    if (totals.retailSubtotal > 0) {
      lines.push('─────────────────────────');
      lines.push(`  Retail Subtotal: ${fmt(totals.retailSubtotal)}`);
    }
    lines.push('');
  }

  // ── Wholesale section ────────────────────────────────────────────────────────
  if (wholesaleItems.length > 0) {
    lines.push('🏭 *WHOLESALE ITEMS*');
    lines.push('─────────────────────────');

    // Group soaps to show combined tier info
    const soapItems    = wholesaleItems.filter((i) => i.category === 'soap');
    const nonSoapItems = wholesaleItems.filter((i) => i.category !== 'soap');

    if (soapItems.length > 0) {
      const combinedSoapQty  = soapItems.reduce((s, i) => s + i.quantity, 0);
      const pricePerUnit     = soapItems[0]?.pricePerUnit ?? 0;
      const gstRate          = soapItems[0]?.gstRate ?? 0;
      const tierLabel        =
        combinedSoapQty >= 501 ? '501+ units tier'
        : combinedSoapQty >= 101 ? '101–500 units tier'
        : combinedSoapQty >= 50  ? '50–100 units tier'
        : 'Single-unit rate';

      lines.push(`  📦 *100g Soaps* — ${tierLabel}`);
      soapItems.forEach((item) => {
        const variant = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
        const lineTotal = pricePerUnit * item.quantity;
        lines.push(`    • ${item.name}${variant}`);
        lines.push(`      Qty: ${item.quantity}  ×  ${fmt(pricePerUnit)} = ${fmt(lineTotal)}`);
      });
      const soapSubtotal = pricePerUnit * combinedSoapQty;
      const soapGst      = soapSubtotal * gstRate;
      lines.push(`    Combined: ${combinedSoapQty} units`);
      if (gstRate > 0) {
        lines.push(`    Subtotal: ${fmt(soapSubtotal)}  +  GST (${(gstRate * 100).toFixed(0)}%): ${fmt(soapGst)}`);
        lines.push(`    Soap Total: ${fmt(soapSubtotal + soapGst)}`);
      } else {
        lines.push(`    Soap Total: ${fmt(soapSubtotal)}`);
      }
      lines.push('');
    }

    if (nonSoapItems.length > 0) {
      nonSoapItems.forEach((item) => {
        const variant      = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
        const pricePerUnit = item.pricePerUnit ?? 0;
        const gstRate      = item.gstRate ?? 0;
        const subtotal     = pricePerUnit * item.quantity;
        const gst          = subtotal * gstRate;
        lines.push(`  • ${item.name}${variant}`);
        lines.push(`    Qty: ${item.quantity}  ×  ${fmt(pricePerUnit)} = ${fmt(subtotal)}`);
        if (gstRate > 0) {
          lines.push(`    GST (${(gstRate * 100).toFixed(0)}%): ${fmt(gst)}  →  ${fmt(subtotal + gst)}`);
        }
      });
      lines.push('');
    }

    // Wholesale totals
    lines.push('─────────────────────────');
    if (totals.wholesaleSubtotalPreGst > 0) {
      lines.push(`  Wholesale Subtotal: ${fmt(totals.wholesaleSubtotalPreGst)}`);
    }
    if (totals.wholesaleGstAmount > 0) {
      lines.push(`  GST Amount:         ${fmt(totals.wholesaleGstAmount)}`);
      lines.push(`  Wholesale Total:    ${fmt(totals.wholesaleSubtotalWithGst)}`);
    }
    lines.push('');
  }

  // ── Grand total ──────────────────────────────────────────────────────────────
  if (wholesaleItems.length > 0 && totals.grandTotal > 0) {
    lines.push('─────────────────────────');
    lines.push(`💰 *GRAND TOTAL: ${fmt(totals.grandTotal)}*`);
    lines.push('  _(Wholesale total includes GST. Retail prices confirmed on delivery.)_');
    lines.push('');
  }

  // ── Delivery details ─────────────────────────────────────────────────────────
  const { name, phone, address, city, pincode, note } = customerInfo;
  lines.push('📍 *Delivery Details*');
  lines.push(`👤 Name: ${name || '—'}`);
  lines.push(`📞 Phone: ${phone || '—'}`);
  lines.push(`🏠 Address: ${address || '—'}`);
  lines.push(`🏙️ City: ${city || '—'}  |  Pincode: ${pincode || '—'}`);
  if (note) lines.push(`📝 Note: ${note}`);
  lines.push('');
  lines.push('─────────────────────────');
  lines.push('_We will confirm your order shortly._');

  const message      = lines.join('\n');
  const encodedMsg   = encodeURIComponent(message);
  const url          = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

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
