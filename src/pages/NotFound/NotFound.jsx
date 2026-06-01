import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6 pt-16">
      <div className="text-center max-w-sm mx-auto">

        {/* Decorative number */}
        <p className="font-['Montserrat'] text-[7rem] sm:text-[9rem] font-light text-[#6B8F5E]/15 leading-none select-none">
          404
        </p>

        {/* Divider */}
        <div className="w-8 h-px bg-[#6B8F5E] mx-auto mb-6 -mt-2" />

        <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-3 font-['Montserrat']">
          Page Not Found
        </p>

        <h1 className="font-['Montserrat'] text-lg sm:text-xl tracking-[0.1em] uppercase text-[#2C2C2C] font-normal mb-4">
          This page doesn't exist
        </h1>

        <p className="text-sm text-[#7A7A72] font-light leading-relaxed mb-8">
          The page you're looking for may have been moved or removed.
          Let's get you back to something good.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto border border-[#1A1A1A] bg-transparent text-[#2C2C2C] text-xs tracking-[0.18em] uppercase px-10 py-4 transition-all duration-[400ms] ease-out hover:bg-[#1A1A1A] hover:text-white cursor-pointer font-['Montserrat']"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate('/products')}
            className="w-full sm:w-auto border border-[#6B8F5E] bg-[#6B8F5E] text-white text-xs tracking-[0.18em] uppercase px-10 py-4 transition-all duration-[400ms] ease-out hover:bg-[#5a7d4f] cursor-pointer font-['Montserrat']"
          >
            Shop Products
          </button>
        </div>

      </div>
    </main>
  );
}
