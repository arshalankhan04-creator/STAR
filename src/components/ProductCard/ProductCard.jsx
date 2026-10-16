import { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';
import { getDefaultVariant } from '../../utils/productHelpers';

export default function ProductCard({ product, showDetails = true }) {
  const { addItem } = useCart();
  const { t, lang } = useLang();
  const [selectedVariant, setSelectedVariant] = useState(() => getDefaultVariant(product));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const displayName = lang === 'gu' && product.nameGu ? product.nameGu : product.name;
  const displayCategoryLabel = lang === 'gu' && product.categoryLabelGu ? product.categoryLabelGu : product.categoryLabel;
  const displayBenefits = lang === 'gu'
    ? (product.benefitsGu ?? product.benefitsEn ?? '')
    : (product.benefitsEn ?? product.benefitsGu ?? '');
  const displayIngredients = lang === 'gu'
    ? (product.ingredientsGu ?? product.ingredientsEn ?? '')
    : (product.ingredientsEn ?? product.ingredientsGu ?? '');

  const is100gSoap =
    product.category === 'soap' &&
    (
      (!product.hasVariants && (product.unit === '100g' || product.packImage)) ||
      (selectedVariant && (selectedVariant.label === '100g' || selectedVariant.id?.endsWith('-100g')))
    );

  const packImg = (selectedVariant && selectedVariant.packImage) || product.packImage || null;
  const barImg = (selectedVariant && selectedVariant.image) || product.image || null;

  // For 100g soap: pack image first by default, bar image second
  const images = (is100gSoap && packImg && barImg && packImg !== barImg)
    ? [packImg, barImg]
    : (barImg ? [barImg] : (packImg ? [packImg] : []));

  const imgFit = product.imageStyle === 'contain' ? 'object-contain' : 'object-cover';

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  const hasDetails = showDetails && (displayBenefits || displayIngredients);

  function handleSelectVariant(variant, e) {
    if (e) e.stopPropagation();
    setSelectedVariant(variant);
    setActiveImageIndex(0);
  }

  function handleTouchStart(e) {
    if (images.length > 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  }

  function handleTouchEnd(e) {
    if (images.length > 1 && touchStartX.current !== null && touchStartY.current !== null) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev === 0 ? 1 : 0));
      }
      touchStartX.current = null;
      touchStartY.current = null;
    }
  }

  function toggleImage(e) {
    if (e) e.stopPropagation();
    if (images.length > 1) {
      setActiveImageIndex((prev) => (prev === 0 ? 1 : 0));
    }
  }

  function createRipple(e) {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }

  function handleAddToCart(e) {
    createRipple(e);
    addItem(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="flex flex-col bg-white group border border-transparent hover:border-[#E4E4DC] transition-colors duration-300">

      {/* Image Container with Swipe / Click navigation for 100g soaps */}
      <div
        className="relative w-full aspect-square bg-[#F5F5F0] overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={images.length > 1 ? toggleImage : undefined}
      >
        {images.length > 0 ? (
          <>
            {images.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={selectedVariant ? `${product.name} — ${selectedVariant.label}` : product.name}
                className={`absolute inset-0 w-full h-full ${imgFit} transition-all duration-[350ms] ease-out ${
                  idx === activeImageIndex
                    ? 'opacity-100 z-10 scale-100 group-hover:scale-[1.03]'
                    : 'opacity-0 z-0 scale-98 pointer-events-none'
                }`}
                loading="lazy"
              />
            ))}

            {/* Desktop / Laptop Click Navigation & Indicators (100g soaps only) */}
            {images.length > 1 && (
              <>
                {/* Prev Arrow */}
                <button
                  type="button"
                  onClick={toggleImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 shadow-md cursor-pointer"
                  aria-label="Previous view"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next Arrow */}
                <button
                  type="button"
                  onClick={toggleImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 shadow-md cursor-pointer"
                  aria-label="Next view"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div
                  className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/35 backdrop-blur-xs px-2.5 py-1 rounded-full pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(idx);
                      }}
                      className={`rounded-full transition-all duration-200 cursor-pointer ${
                        idx === activeImageIndex
                          ? 'w-4 h-1.5 bg-white'
                          : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`View ${idx === 0 ? 'Pack' : 'Bar'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
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
                onClick={(e) => handleSelectVariant(variant, e)}
                className={`text-[10px] sm:text-xs px-2.5 py-1 border tracking-[0.05em] transition-all duration-200 active:scale-95 cursor-pointer ${
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

        {/* Retail Price */}
        {currentPrice != null && (
          <p className="font-['Montserrat'] text-xs sm:text-sm font-semibold text-[#2C2C2C] mt-2 tracking-wider">
            ₹{currentPrice}
          </p>
        )}
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
          ref={btnRef}
          onClick={handleAddToCart}
          disabled={product.hasVariants && !selectedVariant}
          className={`ripple-container w-full border text-[10px] sm:text-xs tracking-[0.12em] uppercase py-3 transition-all duration-[400ms] cursor-pointer font-['Montserrat'] ${
            added
              ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white scale-[0.98]'
              : 'border-[#1A1A1A] bg-transparent text-[#2C2C2C] hover:bg-[#1A1A1A] hover:text-white active:scale-[0.97] disabled:border-[#C8C8C0] disabled:text-[#AEAEA6] disabled:cursor-not-allowed'
          }`}
          aria-label={`${t.cardAddToCart} ${product.name}`}
        >
          {ripples.map((r) => (
            <span key={r.id} className="ripple-wave" style={{ left: r.x, top: r.y }} />
          ))}
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
