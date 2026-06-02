import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6 pt-16">
      <div className="text-center max-w-sm mx-auto">

        <p className="font-['Montserrat'] text-[7rem] sm:text-[9rem] font-light text-[#6B8F5E]/15 leading-none select-none">
          404
        </p>

        <div className="w-8 h-px bg-[#6B8F5E] mx-auto mb-6 -mt-2" />

        <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-3 font-['Montserrat']">
          {t.notFoundEyebrow}
        </p>

        <h1 className="font-['Montserrat'] text-lg sm:text-xl tracking-[0.1em] uppercase text-[#2C2C2C] font-normal mb-4">
          {t.notFoundHeading}
        </h1>

        <p className="text-sm text-[#7A7A72] font-light leading-relaxed mb-8">
          {t.notFoundDesc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto border border-[#1A1A1A] bg-transparent text-[#2C2C2C] text-xs tracking-[0.18em] uppercase px-10 py-4 transition-all duration-[400ms] ease-out hover:bg-[#1A1A1A] hover:text-white cursor-pointer font-['Montserrat']"
          >
            {t.notFoundHome}
          </button>
          <button
            onClick={() => navigate('/products')}
            className="w-full sm:w-auto border border-[#6B8F5E] bg-[#6B8F5E] text-white text-xs tracking-[0.18em] uppercase px-10 py-4 transition-all duration-[400ms] ease-out hover:bg-[#5a7d4f] cursor-pointer font-['Montserrat']"
          >
            {t.notFoundShop}
          </button>
        </div>

      </div>
    </main>
  );
}
