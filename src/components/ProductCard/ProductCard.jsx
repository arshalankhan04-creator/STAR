import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';
import { getDisplayPrice, getDefaultVariant } from '../../utils/productHelpers';

export default function ProductCard({ product, showDetails = true }) {
  const { addItem } = useCart();
  const { t, lang } = useLang();
  const [selectedVariant, setSelectedVariant] = useState(getDefaultVariant(product));
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const displayName = lang === 'gu' && product.nameGu ? product.nameGu : product.name;
  const displayCategoryLabel = lang === 'gu' && product.categoryLabelGu ? product.categoryLabelGu : product.categoryLabel;
  const displayBenefits = lang === 'gu'
    ? (product.benefitsGu ?? product.benefitsEn ?? '')
    : (product.benefitsEn ?? product.benefitsGu ?? '');
  const displayIngredients = lang === 'gu'
    ? (product.ingredientsGu ?? product.ingredientsEn ?? '')
    : (product.ingredientsEn ?? product.ingredientsGu ?? '');

  const activeImage =
    (selectedVariant?.image ?? null) !== null
      ? selectedVariant.image
      : product.image ?? null;

  const imgFit = product.imageStyle === 'contain' ? 'object-contain' : 'object-cover';

  const displayPrice = product.hasVariants
    ? selectedVariant ? `₹${selectedVariant.price}` : getDisplayPrice(product)
    : `₹${product.price}`;

  const hasDetails = showDetails && (displayBenefits || displayIngredients);

  function handleAddToCart() {
    addItem(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="flex flex-col bg-white group border border-transparent hover:border-[#E4E4DC] transition-colors duration-300">

      {/* Image */}
      <div className="relative w-full aspect-square bg-[#F5F5F0] overflow-hidden">
        {activeImage ? (
          <img
            src={activeImage}
            alt={selectedVariant ? `${product.name} — ${selectedVariant.label}` : product.name}
            className={`w-full h-full ${imgFit} transition-all duration-[400ms] ease-out group-hover:scale-[1.04]`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <PlaceholderIcon />
            <span className="text-[10px] tracking-[0.1em] uppercase text-[#AEAEA6]">
              {t.cardImageSoon}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col items-center text-center px-3 pt-4 pb-2 gap-1 flex-1">
        <h3 className="font-['Montserrat'] text-xs sm:text-sm tracking-[0.1em] uppercase text-[#2C2C2C] font-normal leading-snug">
          {displayName}
        </h3>
        <p className="text-[11px] text-[#7A7A72] italic">
          {displayCategoryLabel}
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

        <p className="text-sm sm:text-base font-['Montserrat'] font-normal text-[#2C2C2C] mt-2">
          {displayPrice}
        </p>
      </div>

      {/* Details Toggle */}
      {hasDetails && (
        <div className="px-3 pb-1">
          <button
            onClick={() => setDetailsOpen((v) => !v)}
            aria-expanded={detailsOpen}
            className="w-full flex items-center justify-between text-[10px] tracking-[0.1em] uppercase text-[#7A7A72] hover:text-[#6B8F5E] transition-colors duration-200 cursor-pointer py-2 border-t border-[#F0F0EA]"
          >
            <span>{t.cardDetails}</span>
            <ChevronIcon open={detailsOpen} />
          </button>

          <div className={`overflow-hidden transition-all duration-300 ease-out ${detailsOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pb-3 flex flex-col gap-3 text-left">
              {displayBenefits && (
                <div>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-[#6B8F5E] font-['Montserrat'] mb-1">{t.cardBenefits}</p>
                  <p className="text-[11px] text-[#4A4A44] font-light leading-relaxed">{displayBenefits}</p>
                </div>
              )}
              {displayBenefits && displayIngredients && <div className="w-full h-px bg-[#F0F0EA]" />}
              {displayIngredients && (
                <div>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-[#6B8F5E] font-['Montserrat'] mb-1">{t.cardIngredients}</p>
                  <p className="text-[11px] text-[#4A4A44] font-light leading-relaxed">{displayIngredients}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <div className="px-3 pb-4 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={product.hasVariants && !selectedVariant}
          className={`w-full border text-[10px] sm:text-xs tracking-[0.12em] uppercase py-3 transition-all duration-[400ms] cursor-pointer font-['Montserrat'] ${
            added
              ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white'
              : 'border-[#1A1A1A] bg-transparent text-[#2C2C2C] hover:bg-[#1A1A1A] hover:text-white disabled:border-[#C8C8C0] disabled:text-[#AEAEA6] disabled:cursor-not-allowed'
          }`}
          aria-label={`${t.cardAddToCart} ${product.name}`}
        >
          {added ? t.cardAdded : t.cardAddToCart}
        </button>
      </div>
    </article>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
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
