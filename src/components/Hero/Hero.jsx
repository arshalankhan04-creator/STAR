import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#F4F6F3]">

      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft white overlay to keep text readable and match the clean aesthetic */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Subtle botanical accent circles on top of image */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#8FA882]/8" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-[#8FA882]/6" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto animate-fade-in-up">

        {/* Eyebrow label */}
        <p className="text-xs tracking-[0.25em] uppercase text-[#8FA882] mb-6 font-['Montserrat'] font-light">
          Pure · Natural · Honest
        </p>

        {/* Main heading */}
        <h1 className="font-['Montserrat'] font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] uppercase leading-[1.4] text-[#555555] mb-6">
          Handmade Soap
          <br />
          <span className="font-normal">&amp; Skincare</span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.12em]">
            Crafted With Nature&apos;s
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.12em]">
            Finest Ingredients
          </span>
        </h1>

        {/* Divider */}
        <div className="w-12 h-px bg-[#8FA882] mx-auto mb-8" />

        {/* CTA Button */}
        <button
          onClick={() => navigate('/products')}
          className="inline-block border border-[#222222] bg-transparent text-[#555555] text-xs tracking-[0.15em] uppercase px-10 py-4 transition-all duration-[400ms] cubic-bezier(0.25,1,0.5,1) hover:bg-[#222222] hover:text-white cursor-pointer"
          aria-label="Shop all products"
        >
          Shop Now
        </button>

        {/* Dot pagination indicator */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <span className="w-5 h-px bg-[#8FA882]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#cccccc]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#cccccc]" />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-slow">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#888888]">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
}
