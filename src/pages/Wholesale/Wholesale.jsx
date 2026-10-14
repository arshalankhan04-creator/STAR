import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { products, WHOLESALE_SOAP_TIERS, WHOLESALE_SOAP_MIN_QTY } from '../../data/products';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  return `₹${Number(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function getSoapTier(qty) {
  for (const tier of WHOLESALE_SOAP_TIERS) {
    if (qty >= tier.min && qty <= tier.max) return tier;
  }
  return WHOLESALE_SOAP_TIERS[WHOLESALE_SOAP_TIERS.length - 1];
}

// ─── Wholesale catalogue ──────────────────────────────────────────────────────

const wholesaleSoapProducts = products
  .filter((p) => p.category === 'soap')
  .map((p) => {
    const v100 = p.hasVariants
      ? p.variants?.find((v) => v.wholesaleEligible)
      : p.wholesaleEligible ? p : null;
    if (!v100) return null;
    const packImage = v100.packImage ?? p.packImage ?? v100.image ?? p.image;
    return {
      id: p.id,
      name: p.name,
      nameGu: p.nameGu,
      category: 'soap',
      packImage,
      variantId: p.hasVariants ? v100.id : null,
      variantLabel: p.hasVariants ? v100.label : (p.unit ?? '100g'),
    };
  })
  .filter(Boolean);

const wholesaleShampooProducts = products
  .filter((p) => p.category === 'shampoo')
  .flatMap((p) =>
    (p.variants ?? [])
      .filter((v) => v.wholesaleEligible || v.wholesalePrice != null)
      .map((v) => ({
        id: p.id, name: p.name, nameGu: p.nameGu, category: 'shampoo',
        packImage: v.image ?? p.image,
        variantId: v.id, variantLabel: v.label,
        wholesalePrice: v.wholesalePrice,
        wholesaleMinQty: v.wholesaleMinQty,
        gstRate: v.gstRate ?? 0.05,
      }))
  );

const wholesaleOilProducts = products
  .filter((p) => p.category === 'hair-oil')
  .flatMap((p) =>
    (p.variants ?? [])
      .filter((v) => v.wholesaleEligible || v.wholesalePrice != null)
      .map((v) => ({
        id: p.id, name: p.name, nameGu: p.nameGu, category: 'hair-oil',
        packImage: v.image ?? p.image,
        variantId: v.id, variantLabel: v.label,
        wholesalePrice: v.wholesalePrice,
        wholesaleMinQty: v.wholesaleMinQty,
        gstRate: v.gstRate ?? 0.05,
      }))
  );

// ─── Shared: Quantity Stepper + Slider ───────────────────────────────────────

function QuantityControl({ value, onChange, min = 1, max = 999, t }) {
  const pct = ((value - min) / (max - min)) * 100;

  function handleText(e) {
    const num = parseInt(e.target.value.replace(/\D/g, ''), 10);
    if (!isNaN(num)) onChange(Math.min(max, Math.max(min, num)));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A7A72] font-['Montserrat']">{t.wsQty}</span>
        <div className="flex items-center border border-[#E4E4DC]">
          <button
            onClick={() => onChange(Math.max(min, value - 1))}
            aria-label="Decrease"
            className="w-7 h-7 flex items-center justify-center text-[#7A7A72] hover:text-[#2C2C2C] hover:bg-[#F5F5F0] transition-colors cursor-pointer border-r border-[#E4E4DC] text-sm"
          >−</button>
          <input
            type="text" inputMode="numeric" value={value} onChange={handleText}
            aria-label="Quantity"
            className="w-10 h-7 text-center text-xs text-[#2C2C2C] font-['Montserrat'] outline-none"
          />
          <button
            onClick={() => onChange(Math.min(max, value + 1))}
            aria-label="Increase"
            className="w-7 h-7 flex items-center justify-center text-[#7A7A72] hover:text-[#2C2C2C] hover:bg-[#F5F5F0] transition-colors cursor-pointer border-l border-[#E4E4DC] text-sm"
          >+</button>
        </div>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 appearance-none rounded-full outline-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #6B8F5E ${pct}%, #E4E4DC ${pct}%)` }}
        aria-label="Quantity slider"
      />
    </div>
  );
}

// ─── Soap card — minimal, matches BulkCard design ─────────────────────────────

function SoapCard({ item, qty, onQtyChange, combinedSoapQty, onAdd, added, t, lang }) {
  const tier      = getSoapTier(combinedSoapQty);
  const subtotal  = tier.pricePerUnit * qty;
  const gst       = subtotal * tier.gstRate;
  const total     = subtotal + gst;
  const displayName = lang === 'gu' && item.nameGu ? item.nameGu : item.name;

  return (
    <article className="flex flex-col bg-white border border-[#E4E4DC] overflow-hidden">
      <div className="aspect-square bg-[#F5F5F0] overflow-hidden">
        <img src={item.packImage} alt={displayName}
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.03]" loading="lazy" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="font-['Montserrat'] text-xs tracking-[0.1em] uppercase text-[#2C2C2C] font-normal leading-snug">{displayName}</h3>
          <p className="text-[11px] text-[#7A7A72] mt-0.5">{item.variantLabel}</p>
        </div>
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex justify-between">
            <span className="text-[#7A7A72]">{t.wsPricePerUnit}</span>
            <span className="text-[#2C2C2C] font-['Montserrat']">{fmt(tier.pricePerUnit)}{tier.gstRate > 0 ? ' + 5% GST' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7A7A72]">{t.wsSubtotal} ({qty} units)</span>
            <span className="text-[#2C2C2C] font-['Montserrat']">{fmt(subtotal)}</span>
          </div>
          {tier.gstRate > 0 && (
            <div className="flex justify-between">
              <span className="text-[#7A7A72]">{t.wsGst}</span>
              <span className="text-[#2C2C2C] font-['Montserrat']">{fmt(gst)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-[#E4E4DC] pt-1.5 mt-0.5">
            <span className="text-[10px] tracking-[0.05em] uppercase text-[#2C2C2C] font-['Montserrat']">{t.wsItemTotal}</span>
            <span className="text-[#2C2C2C] font-['Montserrat'] font-medium">{fmt(total)}</span>
          </div>
          <p className="text-[10px] text-[#7A7A72]">{t.wsMinOrder}: {WHOLESALE_SOAP_MIN_QTY} {t.wsMinOrderCombined}</p>
        </div>
        <QuantityControl value={qty} onChange={onQtyChange} t={t} />
        <button onClick={onAdd}
          className={`w-full border text-[10px] tracking-[0.15em] uppercase py-3 transition-all duration-300 cursor-pointer font-['Montserrat'] ${
            added ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white' : 'border-[#1A1A1A] bg-transparent text-[#2C2C2C] hover:bg-[#1A1A1A] hover:text-white'
          }`}>
          {added ? t.wsAdded : `${t.wsAddToCart} (${qty})`}
        </button>
      </div>
    </article>
  );
}

// ─── Bulk card (Shampoo / Oil) ────────────────────────────────────────────────

function BulkCard({ item, qty, onQtyChange, onAdd, added, t, lang }) {
  const subtotal  = item.wholesalePrice * qty;
  const gst       = subtotal * item.gstRate;
  const total     = subtotal + gst;
  const shortfall = Math.max(0, item.wholesaleMinQty - qty);
  const displayName = lang === 'gu' && item.nameGu ? item.nameGu : item.name;

  return (
    <article className="flex flex-col bg-white border border-[#E4E4DC] overflow-hidden">
      <div className="aspect-square bg-[#F5F5F0] overflow-hidden">
        <img src={item.packImage} alt={`${displayName} ${item.variantLabel}`}
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.03]" loading="lazy" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="font-['Montserrat'] text-xs tracking-[0.1em] uppercase text-[#2C2C2C] font-normal leading-snug">{displayName}</h3>
          <p className="text-[11px] text-[#7A7A72] mt-0.5">{item.variantLabel}</p>
        </div>
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex justify-between">
            <span className="text-[#7A7A72]">{t.wsPricePerUnit}</span>
            <span className="text-[#2C2C2C] font-['Montserrat']">{fmt(item.wholesalePrice)} + 5% GST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7A7A72]">{t.wsSubtotal} ({qty} units)</span>
            <span className="text-[#2C2C2C] font-['Montserrat']">{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7A7A72]">{t.wsGst}</span>
            <span className="text-[#2C2C2C] font-['Montserrat']">{fmt(gst)}</span>
          </div>
          <div className="flex justify-between border-t border-[#E4E4DC] pt-1.5 mt-0.5">
            <span className="text-[10px] tracking-[0.05em] uppercase text-[#2C2C2C] font-['Montserrat']">{t.wsItemTotal}</span>
            <span className="text-[#2C2C2C] font-['Montserrat'] font-medium">{fmt(total)}</span>
          </div>
          <p className="text-[10px] text-[#7A7A72]">{t.wsMinOrder}: {item.wholesaleMinQty} units</p>
        </div>
        <QuantityControl value={qty} onChange={onQtyChange} t={t} />
        {shortfall > 0 && (
          <p className="text-[10px] text-amber-600 leading-relaxed">
            ⚠ {shortfall} {shortfall === 1 ? t.wsAddMoreMin : t.wsAddMoreMinPlural}
          </p>
        )}
        <button onClick={onAdd}
          className={`w-full border text-[10px] tracking-[0.15em] uppercase py-3 transition-all duration-300 cursor-pointer font-['Montserrat'] ${
            added ? 'border-[#6B8F5E] bg-[#6B8F5E] text-white' : 'border-[#1A1A1A] bg-transparent text-[#2C2C2C] hover:bg-[#1A1A1A] hover:text-white'
          }`}>
          {added ? t.wsAdded : `${t.wsAddToCart} (${qty})`}
        </button>
      </div>
    </article>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, heading }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`mb-8 will-animate ${inView ? 'in-view' : ''}`}>
      <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-2 font-['Montserrat']">{eyebrow}</p>
      <h2 className="font-['Montserrat'] text-lg sm:text-xl tracking-[0.12em] uppercase text-[#2C2C2C] font-light">{heading}</h2>
      <div className="w-8 h-px bg-[#6B8F5E] mt-3" />
    </div>
  );
}

function SoapTierBanner({ combinedQty, t }) {
  const tier      = getSoapTier(combinedQty);
  const shortfall = Math.max(0, WHOLESALE_SOAP_MIN_QTY - combinedQty);
  const tierLabel =
    combinedQty >= 501 ? '501–999 units'
    : combinedQty >= 101 ? '101–500 units'
    : combinedQty >= 50  ? '50–100 units'
    : 'Below minimum';

  return (
    <div className={`mb-6 border px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] transition-colors duration-300 ${
      shortfall > 0 ? 'border-amber-200 bg-amber-50' : 'border-[#6B8F5E]/30 bg-[#F0F4EE]'
    }`}>
      <div className="flex items-center gap-2.5">
        <span className={shortfall > 0 ? 'text-amber-500' : 'text-[#6B8F5E]'}>
          {shortfall > 0
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          }
        </span>
        <span className="text-[#2C2C2C] font-['Montserrat']">
          {t.wsBannerCombined}: <strong>{combinedQty} {combinedQty !== 1 ? t.wsBannerUnits : t.wsBannerUnit}</strong>
        </span>
      </div>
      <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
        <span className={`font-['Montserrat'] tracking-[0.05em] ${shortfall > 0 ? 'text-amber-600' : 'text-[#6B8F5E]'}`}>
          {shortfall > 0
            ? `${shortfall} ${t.wsBannerAddMore}`
            : `${tierLabel} — ${fmt(tier.pricePerUnit)}/unit ${t.wsBannerTierActive}`}
        </span>
      </div>
    </div>
  );
}

// ─── Pricing tables ───────────────────────────────────────────────────────────

// rows: array of { cells: [col0, col1, col2, col3], highlight: bool }
function PricingTable({ eyebrow, heading, note, rows, columns }) {
  const [ref, inView] = useInView();
  return (
    <section className="w-full bg-white py-10 md:py-14 border-t border-[#E4E4DC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-2 font-['Montserrat']">{eyebrow}</p>
          <h2 className="font-['Montserrat'] text-lg sm:text-xl tracking-[0.12em] uppercase text-[#2C2C2C] font-light">{heading}</h2>
          <div className="w-8 h-px bg-[#6B8F5E] mt-3" />
          {note && <p className="text-xs text-[#7A7A72] mt-4 max-w-lg leading-relaxed">{note}</p>}
        </div>

        <div ref={ref} className={`will-animate ${inView ? 'in-view' : ''}`}>
          {/* Mobile: stacked cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            {rows.map((row, i) => (
              <div key={i} className={`border p-4 flex flex-col gap-1.5 ${row.highlight ? 'border-[#6B8F5E]/40 bg-[#F8FAF7]' : 'border-[#E4E4DC]'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-['Montserrat'] text-xs tracking-[0.05em] text-[#2C2C2C]">{row.cells[0]}</span>
                  {row.cells[3] && <span className="text-[10px] text-[#6B8F5E] font-['Montserrat']">{row.cells[3]}</span>}
                </div>
                <div className="flex gap-4 text-[11px] text-[#7A7A72]">
                  <span>Price: <strong className="text-[#2C2C2C]">{row.cells[1]}</strong></span>
                  <span>GST: <strong className="text-[#2C2C2C]">{row.cells[2]}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden sm:block overflow-hidden border border-[#E4E4DC]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F0F4EE]">
                  {columns.map((col) => (
                    <th key={col} className="text-left px-5 py-3 text-[10px] tracking-[0.15em] uppercase font-['Montserrat'] text-[#7A7A72] font-normal">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`border-t border-[#E4E4DC] ${row.highlight ? 'bg-[#F8FAF7]' : ''}`}>
                    {row.cells.map((cell, ci) => (
                      <td key={ci} className={`px-5 py-3.5 font-['Montserrat'] ${ci === 1 ? 'font-medium text-xs text-[#2C2C2C]' : 'text-xs text-[#2C2C2C]'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks({ t }) {
  const [ref, inView] = useInView();
  const steps = [
    { n: '01', title: t.wsStep1Title, desc: t.wsStep1Desc, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/></svg> },
    { n: '02', title: t.wsStep2Title, desc: t.wsStep2Desc, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> },
    { n: '03', title: t.wsStep3Title, desc: t.wsStep3Desc, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
    { n: '04', title: t.wsStep4Title, desc: t.wsStep4Desc, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
  ];
  return (
    <section className="w-full bg-[#F0F4EE] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B8F5E] mb-2 font-['Montserrat']">{t.wsHowEyebrow}</p>
          <h2 className="font-['Montserrat'] text-lg sm:text-xl tracking-[0.12em] uppercase text-[#2C2C2C] font-light">{t.wsHowTitle}</h2>
          <div className="w-8 h-px bg-[#6B8F5E] mx-auto mt-3" />
        </div>
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 will-animate ${inView ? 'in-view' : ''}`}>
          {steps.map((s, i) => (
            <div key={s.n} className={`flex flex-col gap-3 delay-${i + 1}`}>
              <div className="w-9 h-9 border border-[#6B8F5E]/40 flex items-center justify-center text-[#6B8F5E]">{s.icon}</div>
              <span className="font-['Montserrat'] text-3xl font-light text-[#6B8F5E]/20 tracking-tight">{s.n}</span>
              <div className="w-5 h-px bg-[#6B8F5E]" />
              <h3 className="font-['Montserrat'] text-xs tracking-[0.1em] uppercase text-[#2C2C2C] font-medium">{s.title}</h3>
              <p className="text-xs text-[#7A7A72] font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Wholesale() {
  const navigate  = useNavigate();
  const { addItem, items: cartItems } = useCart();
  const { t, lang } = useLang();
  const [headerRef, headerInView] = useInView();

  const [qtys, setQtys] = useState(() => {
    const init = {};
    wholesaleSoapProducts.forEach((p)    => { init[p.variantId ?? p.id] = 1; });
    wholesaleShampooProducts.forEach((p) => { init[p.variantId] = p.wholesaleMinQty; });
    wholesaleOilProducts.forEach((p)     => { init[p.variantId] = p.wholesaleMinQty; });
    return init;
  });

  const [addedKeys, setAddedKeys] = useState(new Set());

  function setQty(key, val) {
    setQtys((prev) => ({ ...prev, [key]: Math.min(999, Math.max(1, val)) }));
  }

  function markAdded(key) {
    setAddedKeys((prev) => new Set([...prev, key]));
    setTimeout(() => setAddedKeys((prev) => { const n = new Set(prev); n.delete(key); return n; }), 1800);
  }

  // Combined soap qty = already in cart + currently set on page
  const soapQtyInCart = useMemo(
    () => cartItems.filter((i) => i.pricingMode === 'wholesale' && i.category === 'soap').reduce((s, i) => s + i.quantity, 0),
    [cartItems]
  );
  const soapQtyOnPage = useMemo(
    () => wholesaleSoapProducts.reduce((s, p) => s + (qtys[p.variantId ?? p.id] ?? 1), 0),
    [qtys]
  );
  const combinedSoapQty = soapQtyInCart + soapQtyOnPage;

  function handleAddSoap(item) {
    const key     = item.variantId ?? item.id;
    const qty     = qtys[key] ?? 1;
    const product = products.find((p) => p.id === item.id);
    const variant = product?.hasVariants ? product.variants?.find((v) => v.id === item.variantId) : null;
    addItem(product, variant, qty, 'wholesale');
    markAdded(key);
  }

  function handleAddBulk(item) {
    const key     = item.variantId;
    const qty     = qtys[key] ?? item.wholesaleMinQty;
    const product = products.find((p) => p.id === item.id);
    const variant = product?.variants?.find((v) => v.id === item.variantId);
    addItem(product, variant, qty, 'wholesale');
    markAdded(key);
  }

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Hero */}
      <div ref={headerRef} className={`bg-[#2C2C2C] py-12 md:py-16 will-animate ${headerInView ? 'in-view' : ''}`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#6B8F5E] mb-4 font-['Montserrat']">{t.wsEyebrow}</p>
          <h1 className="font-['Montserrat'] text-2xl sm:text-3xl md:text-4xl tracking-[0.12em] uppercase text-white font-light leading-snug">{t.wsHeroHeading}</h1>
          <div className="w-8 h-px bg-[#6B8F5E] mx-auto mt-5" />
          <p className="text-sm text-white/60 mt-5 max-w-md mx-auto font-light leading-relaxed">{t.wsHeroDesc}</p>
        </div>
      </div>

      {/* How It Works */}
      <HowItWorks t={t} />

      {/* ── Soaps ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader eyebrow={t.wsSoapsEyebrow} heading={t.wsSoapsHeading} />
        <SoapTierBanner combinedQty={combinedSoapQty} t={t} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wholesaleSoapProducts.map((item) => {
            const key = item.variantId ?? item.id;
            return (
              <SoapCard key={key} item={item} qty={qtys[key] ?? 1} onQtyChange={(v) => setQty(key, v)}
                combinedSoapQty={combinedSoapQty} onAdd={() => handleAddSoap(item)} added={addedKeys.has(key)} t={t} lang={lang} />
            );
          })}
        </div>
      </section>

      {/* Soap pricing table */}
      <PricingTable
        eyebrow={t.wsSoapTableEyebrow} heading={t.wsSoapTableHeading} note={t.wsSoapTableNote}
        columns={[t.wsSoapTableCol1, t.wsSoapTableCol2, t.wsSoapTableCol3, t.wsSoapTableCol4]}
        rows={[
          { cells: [t.wsSoapRow1Qty, '₹80', '—',  t.wsSoapRow1Note], highlight: false },
          { cells: [t.wsSoapRow2Qty, '₹65', '5%', t.wsSoapRow2Note], highlight: true  },
          { cells: [t.wsSoapRow3Qty, '₹60', '5%', t.wsSoapRow3Note], highlight: false },
          { cells: [t.wsSoapRow4Qty, '₹55', '5%', t.wsSoapRow4Note], highlight: false },
        ]}
      />

      {/* ── Shampoo ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader eyebrow={t.wsShampooEyebrow} heading={t.wsShampooHeading} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {wholesaleShampooProducts.map((item) => (
            <BulkCard key={item.variantId} item={item} qty={qtys[item.variantId] ?? item.wholesaleMinQty}
              onQtyChange={(v) => setQty(item.variantId, v)} onAdd={() => handleAddBulk(item)}
              added={addedKeys.has(item.variantId)} t={t} lang={lang} />
          ))}
        </div>
      </section>

      {/* Shampoo pricing table */}
      <PricingTable
        eyebrow={t.wsShampooEyebrow} heading={t.wsShampooTableHeading} note={t.wsShampooTableNote}
        columns={[t.wsShampooTableCol1, t.wsShampooTableCol2, t.wsShampooTableCol3, t.wsShampooTableCol4]}
        rows={[
          { cells: ['100ml', '₹70',  '5%', t.wsShampoo100Note], highlight: false },
          { cells: ['200ml', '₹175', '5%', t.wsShampoo200Note], highlight: false },
          { cells: ['500ml', '₹340', '5%', t.wsShampoo500Note], highlight: false },
        ]}
      />

      {/* ── Hair Oil ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader eyebrow={t.wsOilEyebrow} heading={t.wsOilHeading} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {wholesaleOilProducts.map((item) => (
            <BulkCard key={item.variantId} item={item} qty={qtys[item.variantId] ?? item.wholesaleMinQty}
              onQtyChange={(v) => setQty(item.variantId, v)} onAdd={() => handleAddBulk(item)}
              added={addedKeys.has(item.variantId)} t={t} lang={lang} />
          ))}
        </div>
      </section>

      {/* Oil pricing table */}
      <PricingTable
        eyebrow={t.wsOilEyebrow} heading={t.wsOilTableHeading} note={t.wsOilTableNote}
        columns={[t.wsOilTableCol1, t.wsOilTableCol2, t.wsOilTableCol3, t.wsOilTableCol4]}
        rows={[
          { cells: ['100ml', '₹140', '5%', t.wsOil100Note], highlight: false },
          { cells: ['250ml', '₹340', '5%', t.wsOil250Note], highlight: false },
          { cells: ['500ml', '₹660', '5%', t.wsOil500Note], highlight: false },
        ]}
      />

      {/* Back */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <button onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[#7A7A72] hover:text-[#2C2C2C] transition-colors duration-200 active:scale-95 cursor-pointer font-['Montserrat']">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          {t.wsBackToProducts}
        </button>
      </div>
    </main>
  );
}
