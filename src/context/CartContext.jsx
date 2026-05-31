import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'star_cart';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Generates a unique cart item key based on product id + variant id.
 * This allows the same product in different variants to be separate cart entries.
 */
function getItemKey(productId, variantId) {
  return variantId ? `${productId}__${variantId}` : productId;
}

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
  } catch {
    // storage quota exceeded or private mode — fail silently
  }
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, selectedVariant, quantity = 1 } = action.payload;
      const key = getItemKey(product.id, selectedVariant?.id);
      const price = selectedVariant ? selectedVariant.price : product.price;

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
          categoryLabel: product.categoryLabel,
          image: product.image,
          selectedVariant: selectedVariant || null,
          price,
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

  // Persist to localStorage on every change
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addItem(product, selectedVariant, quantity = 1) {
    dispatch({ type: 'ADD_ITEM', payload: { product, selectedVariant, quantity } });
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
      value={{ items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}
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
