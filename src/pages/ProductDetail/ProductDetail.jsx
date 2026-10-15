import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';
import { getDefaultVariant } from '../../utils/productHelpers';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t, lang } = useLang();
  const { products } = useProducts();

  const product = products.find((p) => p.id === productId);

  const [selectedVariant, setSelectedVariant] = useState(
    product ? getDefaultVariant(product) : null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  // Reset tab when language changes so content re-evaluates cleanly
  useEffect(() => {
    setActiveTab('benefits');
  }, [lang]);

  if (!product) {
    navigate('/404', { replace: true });
    return null;
  }

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

  // 100g soap: pack image first by default, bar image second
  const images = (is100gSoap && packImg && barImg && packImg !== barImg)
    ? [packImg, barImg]
    : (barImg ? [barImg] : (packImg ? [packImg] : []));

  const imgFit = product.imageStyle === 'contain' ? 'object-contain' : 'object-cover';

  function handleSelectVariant(variant) {
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
        setActiveImageIndex((prev) => (prev === 0 ? 1 : 0));
      }
      touchStartX.current = null;
      touchStartY.current = null;
    }
  }

  function toggleImage() {
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
    setTimeout(() => setAdded(false), 1800);
  }

  const hasDetails = displayBenefits || displayIngredients;

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 animate-fade-in">
        <nav className="flex items-center gap-2 text-[11px] text-[#7A7A72] tracking-[0.05em]">
          <button onClick={() => navigate('/')} className="hover:text-[#2C2C2C] transition-colors cursor-pointer">{t.detailHome}</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-[#2C2C2C] transition-colors cursor-pointer">{t.detailProducts}</button>
          <span>/</span>
          <span className="text-[#2C2C2C]">{displayName}</span>
        </nav>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20">

          {/* Image Panel */}
          <div className="w-full animate-slide-in-left">
            <div
              className="relative aspect-square bg-[#F5F5F0] overflow-hidden select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {images.length > 0 ? (
                <>
                  {images.map((imgSrc, idx) => (
                    <img
                      key={idx}
                      src={imgSrc}
                      alt={selectedVariant ? `${product.name} — ${selectedVariant.label}` : product.name}
                      className={`absolute inset-0 w-full h-full ${imgFit} transition-all duration-400 ease-out hover:scale-[1.03] ${
                        idx === activeImageIndex
                          ? 'opacity-100 z-10 scale-100'
                          : 'opacity-0 z-0 scale-98 pointer-events-none'
                      }`}
                    />
                  ))}

                  {/* 100g Soap Navigation Arrows & Dots */}
                  {images.length > 1 && (
                    <>
                      {/* Prev Arrow */}
                      <button
                        type="button"
                        onClick={toggleImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer"
                        aria-label="Previous view"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>

                      {/* Next Arrow */}
                      <button
                        type="button"
                        onClick={toggleImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer"
                        aria-label="Next view"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>

                      {/* Dots indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/35 backdrop-blur-xs px-3 py-1.5 rounded-full">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImageIndex(idx)}
                            className={`rounded-full transition-all duration-200 cursor-pointer ${
                              idx === activeImageIndex
                                ? 'w-5 h-2 bg-white'
                                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`View ${idx === 0 ? 'Pack' : 'Bar'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[11px] tracking-[0.1em] uppercase text-[#AEAEA6]">{t.detailImageSoon}</span>
                </div>
              )}
            </div>

            {/* If 100g soap has 2 images: View switcher buttons */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setActiveImageIndex(0)}
                  className={`flex-1 py-2 text-[10px] tracking-[0.15em] uppercase font-['Montserrat'] border transition-all duration-200 cursor-pointer ${
                    activeImageIndex === 0
                      ? 'border-[#6B8F5E] bg-[#F0F4EE] text-[#6B8F5E] font-medium'
                      : 'border-[#E4E4DC] text-[#7A7A72] hover:border-[#6B8F5E]'
                  }`}
                >
                  Pack View
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex(1)}
                  className={`flex-1 py-2 text-[10px] tracking-[0.15em] uppercase font-['Montserrat'] border transition-all duration-200 cursor-pointer ${
                    activeImageIndex === 1
                      ? 'border-[#6B8F5E] bg-[#F0F4EE] text-[#6B8F5E] font-medium'
                      : 'border-[#E4E4DC] text-[#7A7A72] hover:border-[#6B8F5E]'
                  }`}
                >
                  Soap Bar View
                </button>
              </div>
            )}

            {/* Variant thumbnails */}
            {product.hasVariants && product.variants && (
              <div className="flex gap-2 mt-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleSelectVariant(variant)}
                    className={`w-16 h-16 border-2 overflow-hidden bg-[#F5F5F0] transition-all duration-200 active:scale-95 cursor-pointer ${
                      selectedVariant?.id === variant.id ? 'border-[#6B8F5E]' : 'border-transparent hover:border-[#C8C8C0]'
                    }`}
                    aria-label={`View ${variant.label}`}
                  >
                    {variant.image ? (
                      <img src={variant.image} alt={variant.label} className={`w-full h-full ${imgFit}`} />
                    ) : (
                      <span className="text-[9px] text-[#AEAEA6] flex items-center justify-center h-full">{variant.label}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-5 animate-slide-in-right">

            <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B8F5E] font-['Montserrat']">
              {displayCategoryLabel}
            </p>

            <h1 className="font-['Montserrat'] text-2xl sm:text-3xl tracking-[0.08em] uppercase text-[#2C2C2C] font-light leading-snug">
              {displayName}
            </h1>

            <div className="w-8 h-px bg-[#6B8F5E] animate-grow-width" />

            {!product.hasVariants && product.unit && (
              <p className="font-['Montserrat'] text-sm text-[#7A7A72] font-normal">
                {product.unit}
              </p>
            )}

            {/* Variant Pills */}
            {product.hasVariants && product.variants && (
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#7A7A72] font-['Montserrat'] mb-2">{t.detailSize}</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`text-xs px-5 py-2.5 border tracking-[0.05em] transition-all duration-200 active:scale-95 cursor-pointer font-['Montserrat'] ${
                        selectedVariant?.id === variant.id
                          ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white'
                          : 'border-[#C8C8C0] text-[#7A7A72] hover:border-[#6B8F5E] hover:text-[#6B8F5E]'
                      }`}
                      aria-pressed={selectedVariant?.id === variant.id}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              ref={btnRef}
              onClick={handleAddToCart}
              disabled={product.hasVariants && !selectedVariant}
              className={`ripple-container w-full border text-xs tracking-[0.18em] uppercase py-4 transition-all duration-[400ms] cursor-pointer font-['Montserrat'] mt-2 ${
                added
                  ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white scale-[0.98]'
                  : 'border-[#1A1A1A] bg-transparent text-[#2C2C2C] hover:bg-[#1A1A1A] hover:text-white active:scale-[0.97] disabled:border-[#C8C8C0] disabled:text-[#AEAEA6] disabled:cursor-not-allowed'
              }`}
              aria-label={`${t.detailAddToCart} ${product.name}`}
            >
              {ripples.map((r) => (
                <span key={r.id} className="ripple-wave" style={{ left: r.x, top: r.y }} />
              ))}
              {added ? t.detailAdded : t.detailAddToCart}
            </button>

            {/* Details Tabs */}
            {hasDetails && (
              <div className="border-t border-[#E4E4DC] pt-5 mt-2">
                <div className="flex gap-6 mb-4 border-b border-[#E4E4DC]">
                  {displayBenefits && (
                    <button
                      onClick={() => setActiveTab('benefits')}
                      className={`text-[10px] tracking-[0.15em] uppercase pb-3 transition-colors duration-200 cursor-pointer font-['Montserrat'] border-b-2 -mb-px ${
                        activeTab === 'benefits' ? 'border-[#6B8F5E] text-[#2C2C2C]' : 'border-transparent text-[#7A7A72] hover:text-[#2C2C2C]'
                      }`}
                    >
                      {t.detailBenefits}
                    </button>
                  )}
                  {displayIngredients && (
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`text-[10px] tracking-[0.15em] uppercase pb-3 transition-colors duration-200 cursor-pointer font-['Montserrat'] border-b-2 -mb-px ${
                        activeTab === 'ingredients' ? 'border-[#6B8F5E] text-[#2C2C2C]' : 'border-transparent text-[#7A7A72] hover:text-[#2C2C2C]'
                      }`}
                    >
                      {t.detailIngredients}
                    </button>
                  )}
                </div>
                <p className="text-sm text-[#4A4A44] font-light leading-relaxed animate-fade-in" key={activeTab}>
                  {activeTab === 'benefits' ? displayBenefits : displayIngredients}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 md:mt-16">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[#7A7A72] hover:text-[#2C2C2C] transition-colors duration-200 active:scale-95 cursor-pointer font-['Montserrat']"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t.detailBack}
          </button>
        </div>
      </div>
    </main>
  );
}
