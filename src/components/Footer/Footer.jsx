import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '../../utils/whatsappMessage';

export default function Footer() {
  return (
    <footer className="w-full bg-[#2C2C2C] border-t border-[#3a3a3a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-['Montserrat'] text-xl font-light tracking-[0.25em] uppercase text-white">
              STAR
            </span>
            <p className="text-xs text-white/50 font-light leading-relaxed max-w-[200px]">
              Handmade skincare crafted with natural ingredients. Pure, honest, and made with love.
            </p>
            <div className="w-6 h-px bg-[#6B8F5E] mt-1" />
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-['Montserrat'] text-[10px] tracking-[0.2em] uppercase text-white/60 font-normal">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-xs text-white/50 hover:text-white transition-colors duration-200 tracking-[0.05em]">Home</Link>
              <Link to="/products" className="text-xs text-white/50 hover:text-white transition-colors duration-200 tracking-[0.05em]">Products</Link>
              <Link to="/products?category=soap" className="text-xs text-white/50 hover:text-white transition-colors duration-200 tracking-[0.05em]">Soaps</Link>
              <Link to="/products?category=hair-oil" className="text-xs text-white/50 hover:text-white transition-colors duration-200 tracking-[0.05em]">Hair Oil</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-['Montserrat'] text-[10px] tracking-[0.2em] uppercase text-white/60 font-normal">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors duration-200"
              >
                <WhatsAppIcon />
                WhatsApp Order
              </a>
              <a href="tel:+919081294043" className="text-xs text-white/50 hover:text-white transition-colors duration-200 tracking-[0.05em]">
                +91 90812 94043
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30 tracking-[0.05em]">
            © {new Date().getFullYear()} STAR. All rights reserved.
          </p>
          <p className="text-[11px] text-white/30 tracking-[0.05em]">
            Handmade with ♥
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
