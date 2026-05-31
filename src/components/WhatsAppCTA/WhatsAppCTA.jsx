import { getWhatsAppLink } from '../../utils/whatsappMessage';

export default function WhatsAppCTA() {
  return (
    <section className="w-full bg-[#FAFAF8] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">

          {/* Icon */}
          <div className="w-14 h-14 rounded-full border border-[#6B8F5E]/30 bg-[#6B8F5E]/8 flex items-center justify-center mx-auto mb-6">
            <WhatsAppIcon size={24} />
          </div>

          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-3 font-['Montserrat'] font-normal">
            Order Directly
          </p>

          <h2 className="font-['Montserrat'] text-lg sm:text-xl md:text-2xl tracking-[0.12em] uppercase text-[#2C2C2C] font-normal mb-4">
            Order on WhatsApp
          </h2>

          <div className="w-8 h-px bg-[#6B8F5E] mx-auto mb-6" />

          <p className="text-sm text-[#7A7A72] font-light leading-relaxed mb-8 max-w-sm mx-auto">
            Add your products to the cart and place your order directly through WhatsApp.
            Fast, simple, and personal — no checkout forms, no waiting.
          </p>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#1A1A1A] bg-transparent text-[#2C2C2C] text-xs tracking-[0.18em] uppercase px-12 py-4 transition-all duration-[400ms] ease-out hover:bg-[#1A1A1A] hover:text-white font-['Montserrat']"
            aria-label="Chat with us on WhatsApp"
          >
            <WhatsAppIcon size={15} />
            Chat With Us
          </a>

          <p className="text-[11px] text-[#7A7A72] mt-5 tracking-[0.05em]">
            +91 93287 98087
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B8F5E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
