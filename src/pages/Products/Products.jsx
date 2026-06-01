import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { products, CATEGORIES } from '../../data/products';
import { filterByCategory } from '../../utils/productHelpers';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get('category') || 'all';
  const filtered = filterByCategory(products, activeCategory);

  const [loading, setLoading] = useState(true);

  // Simulate a brief load so skeletons are visible on first render
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Reset skeleton when category changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [activeCategory]);

  function handleCategoryChange(categoryId) {
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Page Header */}
      <div className="bg-[#F0F4EE] py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-3 font-['Montserrat'] font-normal">
            STAR Herbal Collection
          </p>
          <h1 className="font-['Montserrat'] text-xl sm:text-2xl md:text-3xl tracking-[0.15em] uppercase text-[#2C2C2C] font-light">
            Our Products
          </h1>
          <div className="w-8 h-px bg-[#6B8F5E] mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        {/* Category Filter */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 mb-8 md:mb-12 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 text-[10px] sm:text-xs tracking-[0.12em] uppercase px-4 sm:px-5 py-2.5 border transition-all duration-300 cursor-pointer font-['Montserrat'] ${
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

        {/* Results count */}
        {!loading && (
          <p className="text-xs text-[#7A7A72] mb-6 tracking-[0.05em]">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-['Montserrat'] text-xs tracking-[0.12em] uppercase text-[#7A7A72]">
              No products found
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
