import { getWhatsAppLink } from '../../utils/whatsappMessage';

export default function WhatsAppCTA() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">

          {/* WhatsApp Icon */}
          <div className="w-14 h-14 rounded-full border border-[#8FA882]/40 flex items-center justify-center mx-auto mb-6">
            <WhatsAppIcon />
          </div>

          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8FA882] mb-3 font-['Montserrat']">
            Order Directly
          </p>

          <h2 className="font-['Montserrat'] text-lg sm:text-xl md:text-2xl tracking-[0.12em] uppercase text-[#555555] font-normal mb-4">
            Order on WhatsApp
          </h2>

          <div className="w-8 h-px bg-[#8FA882] mx-auto mb-6" />

          <p className="text-sm text-[#888888] font-light leading-relaxed mb-8 max-w-sm mx-auto">
            Add your products to the cart and place your order directly through WhatsApp.
            Fast, simple, and personal — no checkout forms, no waiting.
          </p>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#222222] bg-transparent text-[#555555] text-xs tracking-[0.15em] uppercase px-10 py-4 transition-all duration-[400ms] hover:bg-[#222222] hover:text-white"
            aria-label="Chat with us on WhatsApp"
          >
            <WhatsAppIcon small />
            Chat With Us
          </a>

          <p className="text-[11px] text-[#888888] mt-5 tracking-[0.05em]">
            +91 90812 94043
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon({ small = false }) {
  const size = small ? 16 : 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8FA882"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
