import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/images/brand/hero.png';
import { useLang } from '../../context/LanguageContext';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#F0F4EE] pt-16 md:pt-20">

      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-white/72" />
      </div>

      {/* Subtle botanical accent shapes — gently drifting */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-[#6B8F5E]/6 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full bg-[#6B8F5E]/5 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      {/* Content — staggered entrance */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Eyebrow */}
        <p
          className="text-[11px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-5 font-['Montserrat'] font-normal animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          {t.heroEyebrow}
        </p>

        {/* Heading */}
        <h1
          className="font-['Montserrat'] font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.08em] uppercase leading-[1.35] text-[#2C2C2C] mb-4 animate-fade-in-up"
          style={{ animationDelay: '0.25s' }}
        >
          {t.heroHeading1}
          <br />
          <span className="font-normal text-[#2C2C2C]">{t.heroHeading2}</span>
        </h1>

        {/* Subheading */}
        <p
          className="font-['Montserrat'] font-light text-base sm:text-lg md:text-xl tracking-[0.12em] uppercase text-[#4A4A44] mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          {t.heroSubheading}
        </p>

        {/* Divider */}
        <div
          className="w-10 h-px bg-[#6B8F5E] mx-auto mb-8 animate-grow-width"
          style={{ animationDelay: '0.55s' }}
        />

        {/* CTA */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: '0.65s' }}
        >
          <button
            onClick={() => navigate('/products')}
            className="inline-block border border-[#1A1A1A] bg-transparent text-[#2C2C2C] text-xs tracking-[0.18em] uppercase px-12 py-4 transition-all duration-[400ms] ease-out hover:bg-[#1A1A1A] hover:text-white active:scale-[0.97] cursor-pointer"
            aria-label={t.heroBtn}
          >
            {t.heroBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
