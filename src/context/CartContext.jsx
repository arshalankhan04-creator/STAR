import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { WHOLESALE_SOAP_TIERS, WHOLESALE_SOAP_MIN_QTY, products as catalogProducts } from '../data/products';

const CartContext = createContext(null);

const STORAGE_KEY = 'star_cart';

// ─── Wholesale Pricing Helpers ────────────────────────────────────────────────

/**
 * Given total combined 100g soap units in the cart, return the active tier.
 * Returns { pricePerUnit, gstRate }
 */
export function getSoapTier(totalSoap100gQty) {
  for (const tier of WHOLESALE_SOAP_TIERS) {
    if (totalSoap100gQty >= tier.min && totalSoap100gQty <= tier.max) {
      return tier;
    }
  }
  // Below min (shouldn't happen with slider starting at 1)
  return WHOLESALE_SOAP_TIERS[WHOLESALE_SOAP_TIERS.length - 1];
}

/**
 * Price per unit for a wholesale soap item (pre-GST).
 */
export function getWholesaleSoapUnitPrice(totalSoap100gQty) {
  return getSoapTier(totalSoap100gQty).pricePerUnit;
}

/**
 * GST rate for wholesale soap at the current tier.
 * Returns 0 if below the minimum qualifying quantity.
 */
export function getWholesaleSoapGstRate(totalSoap100gQty) {
  return getSoapTier(totalSoap100gQty).gstRate;
}

/**
 * Checks whether the minimum combined soap quantity is met.
 * Returns { met: boolean, shortfall: number }
 */
export function checkSoapMinimum(totalSoap100gQty) {
  const shortfall = Math.max(0, WHOLESALE_SOAP_MIN_QTY - totalSoap100gQty);
  return { met: shortfall === 0, shortfall };
}

// ─── Item Key ─────────────────────────────────────────────────────────────────

function getItemKey(productId, variantId, pricingMode) {
  const base = variantId ? `${productId}__${variantId}` : productId;
  return pricingMode === 'wholesale' ? `${base}__ws` : base;
}

// ─── Storage ──────────────────────────────────────────────────────────────────

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* storage quota or private mode — fail silently */ }
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const { product, selectedVariant, quantity = 1, pricingMode = 'retail' } = action.payload;
      const key = getItemKey(product.id, selectedVariant?.id, pricingMode);

      // For retail: use variant price or product price
      // For wholesale soaps: price is calculated dynamically from tier (stored as null, computed at render)
      // For wholesale shampoo/oil: use wholesalePrice from variant
      let price = null;
      if (pricingMode === 'retail') {
        price = selectedVariant ? selectedVariant.price : product.price;
      } else if (pricingMode === 'wholesale') {
        if (product.category === 'soap') {
          price = null; // computed dynamically from tier
        } else {
          price = selectedVariant?.wholesalePrice ?? null;
        }
      }

      const existing = state.find((item) => item.key === key);
      if (existing) {
        return state.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...state,
        {
          key,
          productId: product.id,
          name: product.name,
          nameGu: product.nameGu,
          category: product.category,
          categoryLabel: product.categoryLabel,
          image: selectedVariant?.image ?? product.image,
          selectedVariant: selectedVariant || null,
          price,
          pricingMode,
          // Wholesale-specific fields
          wholesalePrice: selectedVariant?.wholesalePrice ?? null,
          wholesaleMinQty: selectedVariant?.wholesaleMinQty ?? null,
          gstRate: selectedVariant?.gstRate ?? null,
          // Soap wholesale: pricePerUnit is derived from tier — null here, computed in context value
          quantity,
        },
      ];
    }

    case 'REMOVE_ITEM': {
      return state.filter((item) => item.key !== action.payload.key);
    }

    case 'UPDATE_QUANTITY': {
      const { key, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((item) => item.key !== key);
      }
      return state.map((item) =>
        item.key === key ? { ...item, quantity } : item
      );
    }

    case 'CLEAR_CART': {
      return [];
    }

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCartFromStorage);

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  // ── Derived wholesale soap metrics ─────────────────────────────────────────

  const totalWholesaleSoap100gQty = useMemo(
    () =>
      items
        .filter((i) => i.pricingMode === 'wholesale' && i.category === 'soap')
        .reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const soapTier = useMemo(
    () => getSoapTier(totalWholesaleSoap100gQty),
    [totalWholesaleSoap100gQty]
  );

  const soapMinCheck = useMemo(
    () => checkSoapMinimum(totalWholesaleSoap100gQty),
    [totalWholesaleSoap100gQty]
  );

  // ── Enrich items with live pricing ─────────────────────────────────────────
  // Wholesale soap items get their pricePerUnit from the live tier.
  // This means if the customer adds more soaps and crosses a tier boundary,
  // all soap items update automatically.
  const enrichedItems = useMemo(
    () =>
      items.map((item) => {
        if (item.pricingMode === 'wholesale' && item.category === 'soap') {
          return {
            ...item,
            pricePerUnit: soapTier.pricePerUnit,
            gstRate: soapTier.gstRate,
            // Effective unit price including GST
            effectiveUnitPrice: soapTier.pricePerUnit * (1 + soapTier.gstRate),
          };
        }
        if (item.pricingMode === 'wholesale' && item.wholesalePrice !== null) {
          return {
            ...item,
            pricePerUnit: item.wholesalePrice,
            effectiveUnitPrice: item.wholesalePrice * (1 + (item.gstRate ?? 0)),
          };
        }
        // Retail
        let price = item.price;
        if (price === null) {
          const catProd = catalogProducts.find((p) => p.id === item.productId);
          if (catProd) {
            price = item.selectedVariant
              ? (catProd.variants?.find((v) => v.id === item.selectedVariant.id)?.price ?? null)
              : (catProd.price ?? null);
          }
        }
        return {
          ...item,
          price,
          pricePerUnit: price,
          effectiveUnitPrice: price,
        };
      }),
    [items, soapTier]
  );

  // ── Totals ─────────────────────────────────────────────────────────────────

  const totalItems = useMemo(
    () => enrichedItems.reduce((sum, item) => sum + item.quantity, 0),
    [enrichedItems]
  );

  // Retail subtotal (prices already set at product level — no GST)
  const retailSubtotal = useMemo(
    () =>
      enrichedItems
        .filter((i) => i.pricingMode === 'retail')
        .reduce((sum, i) => sum + (i.pricePerUnit ?? 0) * i.quantity, 0),
    [enrichedItems]
  );

  // Wholesale subtotal pre-GST
  const wholesaleSubtotalPreGst = useMemo(
    () =>
      enrichedItems
        .filter((i) => i.pricingMode === 'wholesale')
        .reduce((sum, i) => sum + (i.pricePerUnit ?? 0) * i.quantity, 0),
    [enrichedItems]
  );

  // Wholesale GST amount
  const wholesaleGstAmount = useMemo(
    () =>
      enrichedItems
        .filter((i) => i.pricingMode === 'wholesale')
        .reduce((sum, i) => sum + (i.pricePerUnit ?? 0) * i.quantity * (i.gstRate ?? 0), 0),
    [enrichedItems]
  );

  const wholesaleSubtotalWithGst = wholesaleSubtotalPreGst + wholesaleGstAmount;
  const grandTotal = retailSubtotal + wholesaleSubtotalWithGst;

  const hasRetailItems = enrichedItems.some((i) => i.pricingMode === 'retail');
  const hasWholesaleItems = enrichedItems.some((i) => i.pricingMode === 'wholesale');

  // ── Check per-product wholesale minimums (shampoo/oil) ────────────────────
  // Returns array of { item, shortfall } for items that don't meet their minimum
  const wholesaleMinimumViolations = useMemo(() => {
    return enrichedItems
      .filter(
        (i) =>
          i.pricingMode === 'wholesale' &&
          i.category !== 'soap' &&
          i.wholesaleMinQty !== null &&
          i.quantity < i.wholesaleMinQty
      )
      .map((i) => ({ item: i, shortfall: i.wholesaleMinQty - i.quantity }));
  }, [enrichedItems]);

  // ── Actions ────────────────────────────────────────────────────────────────

  function addItem(product, selectedVariant, quantity = 1, pricingMode = 'retail') {
    dispatch({ type: 'ADD_ITEM', payload: { product, selectedVariant, quantity, pricingMode } });
  }

  function removeItem(key) {
    dispatch({ type: 'REMOVE_ITEM', payload: { key } });
  }

  function updateQuantity(key, quantity) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <CartContext.Provider
      value={{
        items: enrichedItems,
        rawItems: items,
        totalItems,
        // Pricing
        retailSubtotal,
        wholesaleSubtotalPreGst,
        wholesaleGstAmount,
        wholesaleSubtotalWithGst,
        grandTotal,
        // Wholesale soap tier state
        totalWholesaleSoap100gQty,
        soapTier,
        soapMinCheck,
        // Per-product minimum violations (shampoo/oil)
        wholesaleMinimumViolations,
        // Flags
        hasRetailItems,
        hasWholesaleItems,
        // Actions
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
