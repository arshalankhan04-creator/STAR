import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

const STORAGE_KEY = 'star_herbal_products_v1';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load products from localStorage:', e);
    }
    return initialProducts;
  });

  // Sync to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  }, [products]);

  const featuredProducts = products.filter((p) => p.featured);

  function addProduct(newProductData) {
    const id = newProductData.id || `product-${Date.now()}`;
    const productToAdd = {
      ...newProductData,
      id,
      imageStyle: newProductData.imageStyle || 'contain',
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  }

  function updateProduct(id, updatedData) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function resetProducts() {
    setProducts(initialProducts);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear products localStorage:', e);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
