/**
 * Returns the display price for a product.
 * For variant products, returns the price range string.
 * For fixed-price products, returns the price number.
 *
 * @param {Object} product
 * @returns {string}
 */
export function getDisplayPrice(product) {
  if (!product.hasVariants) {
    return `₹${product.price}`;
  }
  const prices = product.variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return `₹${min}`;
  return `₹${min} – ₹${max}`;
}

/**
 * Returns the default (first) variant for a product, or null.
 *
 * @param {Object} product
 * @returns {Object|null}
 */
export function getDefaultVariant(product) {
  if (!product.hasVariants || !product.variants?.length) return null;
  return product.variants[0];
}

/**
 * Filters products by category slug.
 * 'all' returns everything.
 *
 * @param {Array} products
 * @param {string} category
 * @returns {Array}
 */
export function filterByCategory(products, category) {
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
}
