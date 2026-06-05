import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { filterByCategory } from '../../utils/productHelpers';
import { useLang } from '../../context/LanguageContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';
import { useInView } from '../../hooks/useInView';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const activeCategory = searchParams.get('category') || 'all';
  const filtered = filterByCategory(products, activeCategory);
  const [loading, setLoading] = useState(true);
  const [gridKey, setGridKey] = useState(0); // force re-mount grid on category change so animations replay
  const [headerRef, headerInView] = useInView();

  const CATEGORIES = [
    { id: 'all',      label: t.catAll },
    { id: 'soap',     label: t.catSoap },
    { id: 'hair-oil', label: t.catHairOil },
    { id: 'shampoo',  label: t.catShampoo },
    { id: 'face-gel', label: t.catFaceGel },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    setGridKey((k) => k + 1);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  function handleCategoryChange(categoryId) {
    if (categoryId === 'all') setSearchParams({});
    else setSearchParams({ category: categoryId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Page header */}
      <div
        ref={headerRef}
        className={`bg-[#F0F4EE] py-10 md:py-14 will-animate ${headerInView ? 'in-view' : ''}`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-3 font-['Montserrat'] font-normal">
            {t.productsEyebrow}
          </p>
          <h1 className="font-['Montserrat'] text-xl sm:text-2xl md:text-3xl tracking-[0.15em] uppercase text-[#2C2C2C] font-light">
            {t.productsHeading}
          </h1>
          <div className="w-8 h-px bg-[#6B8F5E] mx-auto mt-4 animate-grow-width" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        {/* Category filter pills — staggered */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 mb-8 md:mb-12 scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              style={{ animationDelay: `${i * 0.07}s` }}
              className={`flex-shrink-0 text-[10px] sm:text-xs tracking-[0.12em] uppercase px-4 sm:px-5 py-2.5 border transition-all duration-300 active:scale-95 cursor-pointer font-['Montserrat'] animate-fade-in-up ${
                activeCategory === cat.id
                  ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white'
                  : 'border-[#C8C8C0] text-[#7A7A72] hover:border-[#6B8F5E] hover:text-[#6B8F5E] bg-transparent'
              }`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {!loading && (
          <p className="text-xs text-[#7A7A72] mb-6 tracking-[0.05em] animate-fade-in">
            {filtered.length} {filtered.length === 1 ? t.productsCount1 : t.productsCountN}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <ProductGrid key={gridKey} products={filtered} navigate={navigate} />
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <p className="font-['Montserrat'] text-xs tracking-[0.12em] uppercase text-[#7A7A72]">
              {t.productsNone}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function ProductGrid({ products: items, navigate }) {
  const [ref, inView] = useInView({ threshold: 0.04 });
  const delayClasses = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6'];

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {items.map((product, i) => (
        <div
          key={product.id}
          onClick={() => navigate(`/products/${product.id}`)}
          className={`cursor-pointer will-animate ${inView ? `in-view ${delayClasses[i % 6]}` : ''}`}
        >
          <ProductCard product={product} showDetails={false} />
        </div>
      ))}
    </div>
  );
}
