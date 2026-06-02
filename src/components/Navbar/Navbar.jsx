import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';
import { getWhatsAppLink } from '../../utils/whatsappMessage';

export default function Navbar({ onCartOpen }) {
  const { totalItems } = useCart();
  const { t, lang, chooseLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  const navLinkClass = ({ isActive }) =>
    `text-xs tracking-[0.12em] uppercase transition-colors duration-300 ${
      isActive ? 'text-[#1A1A1A]' : 'text-[#4A4A44] hover:text-[#1A1A1A]'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'border-b border-[#E4E4DC] shadow-[0_1px_8px_rgba(0,0,0,0.04)]' : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            to="/"
            className="font-['Montserrat'] text-xl font-light tracking-[0.25em] uppercase text-[#2C2C2C] hover:text-[#6B8F5E] transition-colors duration-300"
          >
            {t.brandName}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink to="/" end className={navLinkClass}>{t.navHome}</NavLink>
            <NavLink to="/products" className={navLinkClass}>{t.navProducts}</NavLink>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.12em] uppercase text-[#4A4A44] hover:text-[#1A1A1A] transition-colors duration-300"
            >
              {t.navWhatsapp}
            </a>
          </nav>

          {/* Right: Lang Toggle + Cart + Hamburger */}
          <div className="flex items-center gap-2">

            {/* Language Toggle */}
            <button
              onClick={() => chooseLang(lang === 'en' ? 'gu' : 'en')}
              className="text-[10px] tracking-[0.1em] uppercase border border-[#E4E4DC] text-[#7A7A72] hover:border-[#6B8F5E] hover:text-[#6B8F5E] transition-all duration-200 px-2.5 py-1.5 font-['Montserrat'] cursor-pointer hidden sm:block"
              aria-label={`Switch to ${lang === 'en' ? 'Gujarati' : 'English'}`}
            >
              {lang === 'en' ? 'ગુ' : 'EN'}
            </button>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              aria-label={`${t.navOpenCart}, ${totalItems} ${totalItems === 1 ? t.navItem : t.navItems}`}
              className="relative p-2 text-[#4A4A44] hover:text-[#2C2C2C] transition-colors duration-300"
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#6B8F5E] text-white text-[9px] font-medium rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
              aria-label={t.navToggleMenu}
              aria-expanded={menuOpen}
              className="md:hidden p-2 text-[#4A4A44] hover:text-[#2C2C2C] transition-colors duration-300"
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? 'max-h-72 border-t border-[#E4E4DC]' : 'max-h-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col bg-white px-6 py-5 gap-5">
          <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>{t.navHome}</NavLink>
          <NavLink to="/products" className={navLinkClass} onClick={() => setMenuOpen(false)}>{t.navProducts}</NavLink>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.12em] uppercase text-[#4A4A44] hover:text-[#1A1A1A] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            {t.navWhatsapp}
          </a>
          {/* Language toggle in mobile menu */}
          <button
            onClick={() => { chooseLang(lang === 'en' ? 'gu' : 'en'); setMenuOpen(false); }}
            className="text-xs tracking-[0.12em] uppercase text-[#6B8F5E] text-left cursor-pointer font-['Montserrat']"
          >
            {lang === 'en' ? 'ગુજરાતીમાં જુઓ' : 'View in English'}
          </button>
        </nav>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
