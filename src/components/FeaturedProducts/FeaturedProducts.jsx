import { useNavigate } from 'react-router-dom';
import { featuredProducts } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';

export default function FeaturedProducts() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8FA882] mb-3 font-['Montserrat']">
            Handpicked For You
          </p>
          <h2 className="font-['Montserrat'] text-lg sm:text-xl md:text-2xl tracking-[0.15em] uppercase text-[#555555] font-normal">
            Featured Products
          </h2>
          <div className="w-8 h-px bg-[#8FA882] mx-auto mt-4" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={() => navigate('/products')}
            className="inline-block border border-[#222222] bg-transparent text-[#555555] text-xs tracking-[0.15em] uppercase px-10 py-4 transition-all duration-[400ms] hover:bg-[#222222] hover:text-white cursor-pointer"
            aria-label="Explore all products"
          >
            Explore All Products
          </button>
        </div>
      </div>
    </section>
  );
}
