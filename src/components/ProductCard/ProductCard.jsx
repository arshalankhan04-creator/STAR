import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { getDisplayPrice, getDefaultVariant } from '../../utils/productHelpers';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(getDefaultVariant(product));
  const [added, setAdded] = useState(false);

  const displayPrice = product.hasVariants
    ? selectedVariant ? `₹${selectedVariant.price}` : getDisplayPrice(product)
    : `₹${product.price}`;

  function handleAddToCart() {
    addItem(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="flex flex-col bg-white group border border-transparent hover:border-[#E4E4DC] transition-colors duration-300">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-[#F5F5F0] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <PlaceholderIcon />
            <span className="text-[10px] tracking-[0.1em] uppercase text-[#AEAEA6]">Image Soon</span>
          </div>
        )}
      </div>

      {/* Text Stack */}
      <div className="flex flex-col items-center text-center px-3 pt-4 pb-2 gap-1 flex-1">
        <h3 className="font-['Montserrat'] text-xs sm:text-sm tracking-[0.1em] uppercase text-[#2C2C2C] font-normal leading-snug">
          {product.name}
        </h3>
        <p className="text-[11px] text-[#7A7A72] italic">
          {product.categoryLabel}
          {!product.hasVariants && product.unit ? ` · ${product.unit}` : ''}
        </p>

        {/* Variant Pills */}
        {product.hasVariants && product.variants && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`text-[10px] sm:text-xs px-2.5 py-1 border tracking-[0.05em] transition-all duration-200 cursor-pointer ${
                  selectedVariant?.id === variant.id
                    ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white'
                    : 'border-[#C8C8C0] text-[#7A7A72] hover:border-[#6B8F5E] hover:text-[#6B8F5E]'
                }`}
                aria-pressed={selectedVariant?.id === variant.id}
                aria-label={`Select ${variant.label}`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <p className="text-sm sm:text-base font-['Montserrat'] font-normal text-[#2C2C2C] mt-2">
          {displayPrice}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="px-3 pb-4 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={product.hasVariants && !selectedVariant}
          className={`w-full border text-[10px] sm:text-xs tracking-[0.12em] uppercase py-3 transition-all duration-[400ms] cursor-pointer font-['Montserrat'] ${
            added
              ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white'
              : 'border-[#1A1A1A] bg-transparent text-[#2C2C2C] hover:bg-[#1A1A1A] hover:text-white disabled:border-[#C8C8C0] disabled:text-[#AEAEA6] disabled:cursor-not-allowed'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}

function PlaceholderIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8C8C0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="0" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
