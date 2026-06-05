import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { featuredProducts } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import ProductCardSkeleton from '../ProductCardSkeleton/ProductCardSkeleton';
import { useLang } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [loading, setLoading] = useState(true);
  const [headerRef, headerInView] = useInView();
  const [gridRef, gridInView] = useInView({ threshold: 0.06 });
  const [btnRef, btnInView] = useInView();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const delayClasses = ['delay-1', 'delay-2', 'delay-3', 'delay-4'];

  return (
    <section className="w-full bg-[#FAFAF8] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 will-animate ${headerInView ? 'in-view' : ''}`}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-3 font-['Montserrat'] font-normal">
            {t.featuredEyebrow}
          </p>
          <h2 className="font-['Montserrat'] text-lg sm:text-xl md:text-2xl tracking-[0.15em] uppercase text-[#2C2C2C] font-normal">
            {t.featuredHeading}
          </h2>
          <div className="w-8 h-px bg-[#6B8F5E] mx-auto mt-4 animate-grow-width" />
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : featuredProducts.map((product, i) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className={`cursor-pointer will-animate ${gridInView ? `in-view ${delayClasses[i] || ''}` : ''}`}
                >
                  <ProductCard product={product} showDetails={false} />
                </div>
              ))
          }
        </div>

        <div
          ref={btnRef}
          className={`text-center mt-12 md:mt-16 will-animate ${btnInView ? 'in-view' : ''}`}
        >
          <button
            onClick={() => navigate('/products')}
            className="inline-block border border-[#1A1A1A] bg-transparent text-[#2C2C2C] text-xs tracking-[0.18em] uppercase px-12 py-4 transition-all duration-[400ms] ease-out hover:bg-[#1A1A1A] hover:text-white active:scale-[0.97] cursor-pointer font-['Montserrat']"
            aria-label={t.featuredBtn}
          >
            {t.featuredBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
