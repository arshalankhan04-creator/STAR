import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

// ─── Carousel slide data ──────────────────────────────────────────────────────
// 8 slides: 6 soap packs + 1 shampoo + 1 oil
// Images imported directly — no dependency on products.js runtime catalogue

import imgSoapAloveraPack    from '../../assets/images/products/aloevera-cool-soap-pack.webp';
import imgSoapBabyPack       from '../../assets/images/products/baby-soap-pack.webp';
import imgSoapWhiteningPack  from '../../assets/images/products/body-whitening-soap-pack.webp';
import imgSoapCharcoalPack   from '../../assets/images/products/charcoal-multani-mitti-soap-pack.webp';
import imgSoapMilkyPack      from '../../assets/images/products/milky-soap-pack.webp';
import imgSoapNeemPack       from '../../assets/images/products/neem-aloevera-soap-pack.webp';
import imgShampoo500ml       from '../../assets/images/products/herbal-shampoo-500ml-branded.webp';
import imgOil500ml           from '../../assets/images/products/herbal-oil-500ml-branded.webp';

const SLIDES = [
  {
    id: 'aloevera',
    image: imgSoapAloveraPack,
    labelEn: 'Aloevera Cool Soap',
    labelGu: 'એલોવેરા કૂલ સાબુ',
    tagEn: '100g · Wholesale Available',
    tagGu: '100g · જથ્થાબંધ ઉપલબ્ધ',
  },
  {
    id: 'baby',
    image: imgSoapBabyPack,
    labelEn: 'Baby Soap',
    labelGu: 'બેબી સાબુ',
    tagEn: '100g · Wholesale Available',
    tagGu: '100g · જથ્થાબંધ ઉપલબ્ધ',
  },
  {
    id: 'whitening',
    image: imgSoapWhiteningPack,
    labelEn: 'Body Whitening Soap',
    labelGu: 'બૉડી વ્હાઇટનિંગ સાબુ',
    tagEn: '100g · Wholesale Available',
    tagGu: '100g · જથ્થાબંધ ઉપલબ્ધ',
  },
  {
    id: 'charcoal',
    image: imgSoapCharcoalPack,
    labelEn: 'Charcoal & Multani Mitti Soap',
    labelGu: 'ચારકોલ & મુલ્તાની મિટ્ટી સાબુ',
    tagEn: '100g · Wholesale Available',
    tagGu: '100g · જથ્થાબંધ ઉપલબ્ધ',
  },
  {
    id: 'milky',
    image: imgSoapMilkyPack,
    labelEn: 'Milky Soap',
    labelGu: 'મિલ્કી સાબુ',
    tagEn: '100g · Wholesale Available',
    tagGu: '100g · જથ્થાબંધ ઉપલબ્ધ',
  },
  {
    id: 'neem',
    image: imgSoapNeemPack,
    labelEn: 'Neem Aloevera Soap',
    labelGu: 'નીમ એલોવેરા સાબુ',
    tagEn: '100g · Wholesale Available',
    tagGu: '100g · જથ્થાબંધ ઉપલબ્ધ',
  },
  {
    id: 'shampoo',
    image: imgShampoo500ml,
    labelEn: 'Herbal Shampoo',
    labelGu: 'હર્બલ શૅમ્પૂ',
    tagEn: '500ml · Wholesale Available',
    tagGu: '500ml · જથ્થાબંધ ઉપલબ્ધ',
  },
  {
    id: 'oil',
    image: imgOil500ml,
    labelEn: 'Herbal Hair Oil',
    labelGu: 'હર્બલ હેર ઓઈલ',
    tagEn: '500ml · Wholesale Available',
    tagGu: '500ml · જથ્થાબંધ ઉપલબ્ધ',
  },
];

const AUTO_INTERVAL = 3000; // 3 seconds

export default function Hero() {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const total = SLIDES.length;

  const goTo = useCallback((idx) => {
    setCurrent((idx + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  // Pause on hover/touch
  function handleMouseEnter() { setPaused(true); }
  function handleMouseLeave() { setPaused(false); }

  // Touch swipe
  const touchStartX = useRef(null);
  function handleTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  }

  const slide = SLIDES[current];
  const label = lang === 'gu' ? slide.labelGu : slide.labelEn;
  const tag   = lang === 'gu' ? slide.tagGu   : slide.tagEn;

  return (
    <section
      className="relative w-full min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A] pt-16 md:pt-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Wholesale product carousel"
    >
      {/* ── Slides ── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Product image — large, centered */}
          <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 lg:pr-24">
            <img
              src={s.image}
              alt={lang === 'gu' ? s.labelGu : s.labelEn}
              className="h-[55vh] md:h-[70vh] w-auto object-contain select-none"
              draggable={false}
            />
          </div>
          {/* Dark gradient overlay — left side for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/60 to-transparent" />
        </div>
      ))}

      {/* ── Content overlay ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-8 flex flex-col justify-center min-h-[85vh] md:min-h-screen py-24">

        {/* Eyebrow */}
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#6B8F5E] mb-4 font-['Montserrat'] animate-fade-in-up">
          {lang === 'gu' ? 'જથ્થાબંધ ઉત્પાદન' : 'Wholesale Products'}
        </p>

        {/* Product name — changes per slide */}
        <h1
          key={`label-${current}`}
          className="font-['Montserrat'] font-light text-3xl sm:text-4xl md:text-5xl tracking-[0.06em] uppercase text-white leading-snug mb-3 animate-fade-in-up max-w-md"
        >
          {label}
        </h1>

        {/* Tag */}
        <p
          key={`tag-${current}`}
          className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-8 font-['Montserrat'] animate-fade-in-up"
        >
          {tag}
        </p>

        <div className="w-8 h-px bg-[#6B8F5E] mb-8" />

        {/* Wholesale pitch */}
        <p className="text-sm text-white/60 font-light leading-relaxed max-w-xs mb-8">
          {lang === 'gu'
            ? 'ડાયરેક્ટ ફૅક્ટરી ભાવ — 50 unit થી શરૂ. ₹55–₹65/unit + 5% GST.'
            : 'Direct factory pricing — starting from 50 units. ₹55–₹65/unit + 5% GST.'}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/wholesale')}
            className="border border-[#6B8F5E] bg-[#6B8F5E] text-white text-xs tracking-[0.18em] uppercase px-8 py-4 transition-all duration-300 hover:bg-[#5a7d4f] active:scale-[0.97] cursor-pointer font-['Montserrat']"
            aria-label="View wholesale pricing"
          >
            {lang === 'gu' ? 'Wholesale Pricing જુઓ' : 'View Wholesale Pricing'}
          </button>
          <button
            onClick={() => navigate('/products')}
            className="border border-white/30 text-white/70 text-xs tracking-[0.18em] uppercase px-8 py-4 transition-all duration-300 hover:border-white hover:text-white active:scale-[0.97] cursor-pointer font-['Montserrat']"
            aria-label="Browse all products"
          >
            {lang === 'gu' ? 'બધા પ્રોડક્ટ્સ' : 'Browse Products'}
          </button>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-white/60 hover:text-white transition-all duration-200 cursor-pointer bg-black/20"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-white/60 hover:text-white transition-all duration-200 cursor-pointer bg-black/20"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'w-6 bg-[#6B8F5E]' : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-8 right-6 z-20 text-[10px] text-white/40 font-['Montserrat'] tracking-[0.1em]">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </section>
  );
}
