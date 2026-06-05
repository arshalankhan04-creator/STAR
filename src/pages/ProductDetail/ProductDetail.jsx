import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';
import { getDefaultVariant } from '../../utils/productHelpers';
import { useRef } from 'react';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t, lang } = useLang();

  const product = products.find((p) => p.id === productId);

  const [selectedVariant, setSelectedVariant] = useState(
    product ? getDefaultVariant(product) : null
  );
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

  const activeImage =
    (selectedVariant?.image ?? null) !== null
      ? selectedVariant.image
      : product.image ?? null;

  const imgFit = product.imageStyle === 'contain' ? 'object-contain' : 'object-cover';

  const displayPrice = product.hasVariants
    ? selectedVariant ? `₹${selectedVariant.price}` : '—'
    : `₹${product.price}`;

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

          {/* Image Panel — slides in from left */}
          <div className="w-full animate-slide-in-left">
            <div className="aspect-square bg-[#F5F5F0] overflow-hidden">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={selectedVariant ? `${product.name} — ${selectedVariant.label}` : product.name}
                  className={`w-full h-full ${imgFit} transition-transform duration-500 hover:scale-[1.03]`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[11px] tracking-[0.1em] uppercase text-[#AEAEA6]">{t.detailImageSoon}</span>
                </div>
              )}
            </div>

            {/* Variant thumbnails */}
            {product.hasVariants && product.variants && (
              <div className="flex gap-2 mt-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
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

          {/* Info Panel — slides in from right */}
          <div className="flex flex-col gap-5 animate-slide-in-right">

            <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B8F5E] font-['Montserrat']">
              {displayCategoryLabel}
            </p>

            <h1 className="font-['Montserrat'] text-2xl sm:text-3xl tracking-[0.08em] uppercase text-[#2C2C2C] font-light leading-snug">
              {displayName}
            </h1>

            <div className="w-8 h-px bg-[#6B8F5E] animate-grow-width" />

            <p className="font-['Montserrat'] text-2xl text-[#2C2C2C] font-normal">
              {displayPrice}
              {!product.hasVariants && product.unit && (
                <span className="text-sm text-[#7A7A72] font-light ml-2">/ {product.unit}</span>
              )}
            </p>

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

            {/* Add to Cart — with ripple */}
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
