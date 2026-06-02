import { NavLink } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { getWhatsAppLink } from '../../utils/whatsappMessage';

export default function MobileBottomNav() {
  const { t } = useLang();

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors duration-200 ${
      isActive ? 'text-[#6B8F5E]' : 'text-[#7A7A72]'
    }`;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E4E4DC] flex items-center safe-area-pb"
      aria-label="Mobile navigation"
    >
      {/* Home */}
      <NavLink to="/" end className={linkClass}>
        <HomeIcon />
        <span className="text-[9px] tracking-[0.08em] uppercase font-['Montserrat']">
          {t.navHome}
        </span>
      </NavLink>

      {/* Products */}
      <NavLink to="/products" className={linkClass}>
        <ProductsIcon />
        <span className="text-[9px] tracking-[0.08em] uppercase font-['Montserrat']">
          {t.navProducts}
        </span>
      </NavLink>

      {/* WhatsApp */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 flex-1 py-2 text-[#7A7A72] transition-colors duration-200 active:text-[#6B8F5E]"
      >
        <WhatsAppIcon />
        <span className="text-[9px] tracking-[0.08em] uppercase font-['Montserrat']">
          {t.navWhatsapp}
        </span>
      </a>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="7" height="7" />
      <rect x="15" y="3" width="7" height="7" />
      <rect x="15" y="14" width="7" height="7" />
      <rect x="2" y="14" width="7" height="7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
