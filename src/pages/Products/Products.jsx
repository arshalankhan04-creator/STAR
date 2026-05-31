import { useSearchParams } from 'react-router-dom';
import { products, CATEGORIES } from '../../data/products';
import { filterByCategory } from '../../utils/productHelpers';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const filtered = filterByCategory(products, activeCategory);

  function handleCategoryChange(categoryId) {
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
    // Scroll to top of product grid on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Page Header */}
      <div className="bg-[#F4F6F3] py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8FA882] mb-3 font-['Montserrat']">
            STAR Collection
          </p>
          <h1 className="font-['Montserrat'] text-xl sm:text-2xl md:text-3xl tracking-[0.15em] uppercase text-[#555555] font-light">
            Our Products
          </h1>
          <div className="w-8 h-px bg-[#8FA882] mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        {/* Category Filter */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 mb-8 md:mb-12 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 text-[10px] sm:text-xs tracking-[0.12em] uppercase px-4 sm:px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'border-[#222222] bg-[#222222] text-white'
                  : 'border-[#cccccc] text-[#888888] hover:border-[#555555] hover:text-[#555555] bg-transparent'
              }`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-[#888888] mb-6 tracking-[0.05em]">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </p>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-['Montserrat'] text-xs tracking-[0.12em] uppercase text-[#888888]">
              No products found
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
