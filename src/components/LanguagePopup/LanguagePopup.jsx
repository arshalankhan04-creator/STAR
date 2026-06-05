import { useLang } from '../../context/LanguageContext';

export default function LanguagePopup() {
  const { showPopup, chooseLang } = useLang();

  if (!showPopup) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-fade-in" aria-hidden="true" />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lang-popup-heading"
        className="fixed inset-0 z-[101] flex items-center justify-center px-5"
      >
        <div className="w-full max-w-xs bg-white flex flex-col items-center text-center p-8 gap-6 animate-scale-pop shadow-xl">

          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-[#6B8F5E]/10 border border-[#6B8F5E]/25 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B8F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
            </svg>
          </div>

          {/* Heading — bilingual so first-time users can read it */}
          <div>
            <h2
              id="lang-popup-heading"
              className="font-['Montserrat'] text-sm tracking-[0.12em] uppercase text-[#2C2C2C] font-normal"
            >
              Choose Language
            </h2>
            <p className="text-[11px] text-[#7A7A72] mt-1 font-light">
              ભાષા પસંદ કરો
            </p>
          </div>

          {/* Divider */}
          <div className="w-8 h-px bg-[#6B8F5E]" />

          {/* Language Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => chooseLang('en')}
              className="w-full border border-[#1A1A1A] bg-transparent text-[#2C2C2C] text-xs tracking-[0.18em] uppercase py-3.5 font-['Montserrat'] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white active:scale-[0.97] cursor-pointer"
            >
              English
            </button>
            <button
              onClick={() => chooseLang('gu')}
              className="w-full border border-[#6B8F5E] bg-[#6B8F5E] text-white text-sm py-3.5 font-['Montserrat'] transition-all duration-300 hover:bg-[#5a7d4f] active:scale-[0.97] cursor-pointer tracking-wide"
            >
              ગુજરાતી
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
