import { useNavigate } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import { useLang } from '../../context/LanguageContext';
import { products } from '../../data/products';

// Collect pack images for the visual strip — up to 4 soap pack images
const soapPackImages = products
  .filter((p) => p.category === 'soap')
  .map((p) => {
    const v100 = p.hasVariants ? p.variants?.find((v) => v.wholesaleEligible) : null;
    // packImage is the dedicated wholesale/branding photo
    const img = v100?.packImage ?? (p.wholesaleEligible ? p.packImage : null);
    return img ? { id: p.id, name: p.name, img } : null;
  })
  .filter(Boolean)
  .slice(0, 4);

export default function WholesaleSection() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section className="w-full bg-[#2C2C2C] py-16 md:py-24 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 will-animate ${inView ? 'in-view' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-5">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#6B8F5E] font-['Montserrat']">
              {t.wsSecEyebrow}
            </p>

            <h2 className="font-['Montserrat'] text-2xl sm:text-3xl tracking-[0.1em] uppercase text-white font-light leading-snug">
              {t.wsSecHeading1}<br />
              <span className="text-[#6B8F5E]">{t.wsSecHeading2}</span>
            </h2>

            <div className="w-8 h-px bg-[#6B8F5E]" />

            <p className="text-sm text-white/60 font-light leading-relaxed max-w-sm">
              {t.wsSecDesc}
            </p>

            {/* Quick tier highlights */}
            <div className="flex flex-col gap-2 mt-1">
              {[
                { qty: t.wsSecTier1Qty, price: t.wsSecTier1Price },
                { qty: t.wsSecTier2Qty, price: t.wsSecTier2Price },
                { qty: t.wsSecTier3Qty, price: t.wsSecTier3Price },
              ].map((row) => (
                <div key={row.qty} className="flex items-center justify-between border border-white/10 px-4 py-2.5">
                  <span className="text-[11px] text-white/60 font-['Montserrat'] tracking-[0.05em]">{row.qty}</span>
                  <span className="text-[11px] text-[#6B8F5E] font-['Montserrat'] font-medium">{row.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/wholesale')}
              className="mt-2 w-fit border border-[#6B8F5E] text-[#6B8F5E] text-xs tracking-[0.18em] uppercase px-8 py-4 transition-all duration-300 hover:bg-[#6B8F5E] hover:text-white active:scale-95 cursor-pointer font-['Montserrat']"
              aria-label="View wholesale pricing"
            >
              {t.wsSecBtn}
            </button>
          </div>

          {/* Right — product image grid */}
          <div className="grid grid-cols-2 gap-3">
            {soapPackImages.map((item, i) => (
              <div key={item.id} className={`aspect-square bg-[#3A3A3A] overflow-hidden delay-${i + 1}`}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
