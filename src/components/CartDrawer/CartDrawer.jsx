import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';
import { openWhatsAppOrder } from '../../utils/whatsappMessage';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const { t } = useLang();
  const drawerRef = useRef(null);
  const [step, setStep] = useState('cart'); // 'cart' | 'form'

  // Reset to cart step when drawer closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setStep('cart'), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  function handleProceed() {
    if (items.length === 0) return;
    setStep('form');
  }

  function handleFormSubmit(customerInfo) {
    openWhatsAppOrder(items, customerInfo);
    clearCart();
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.cartTitle}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white flex flex-col transition-transform duration-[400ms] ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {step === 'cart' ? (
          <CartStep
            items={items}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onClose={onClose}
            onRemove={removeItem}
            onQuantityChange={updateQuantity}
            onProceed={handleProceed}
            t={t}
          />
        ) : (
          <CheckoutFormStep
            totalPrice={totalPrice}
            onBack={() => setStep('cart')}
            onSubmit={handleFormSubmit}
            t={t}
          />
        )}
      </aside>
    </>
  );
}

// ─── Step 1: Cart ─────────────────────────────────────────────────────────────

function CartStep({ items, totalItems, totalPrice, onClose, onRemove, onQuantityChange, onProceed, t }) {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E4DC]">
        <div>
          <h2 className="font-['Montserrat'] text-xs tracking-[0.15em] uppercase text-[#2C2C2C]">
            {t.cartTitle}
          </h2>
          {totalItems > 0 && (
            <p className="text-[11px] text-[#7A7A72] mt-0.5">
              {totalItems} {totalItems === 1 ? t.cartItemSingular : t.cartItemPlural}
            </p>
          )}
        </div>
        <button onClick={onClose} aria-label={t.cartClose} className="p-2 text-[#7A7A72] hover:text-[#2C2C2C] transition-colors duration-200 cursor-pointer">
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {items.length === 0 ? (
          <EmptyCart t={t} />
        ) : (
          <ul className="flex flex-col gap-5">
            {items.map((item) => (
              <CartItem
                key={item.key}
                item={item}
                onRemove={() => onRemove(item.key)}
                onQuantityChange={(qty) => onQuantityChange(item.key, qty)}
                t={t}
              />
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <div className="border-t border-[#E4E4DC] px-6 py-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs tracking-[0.1em] uppercase text-[#7A7A72] font-['Montserrat']">{t.cartTotal}</span>
            <span className="font-['Montserrat'] text-base font-normal text-[#2C2C2C]">₹{totalPrice}</span>
          </div>
          <button
            onClick={onProceed}
            className="w-full flex items-center justify-center gap-2 bg-[#6B8F5E] text-white text-xs tracking-[0.15em] uppercase py-4 transition-all duration-[400ms] hover:bg-[#5a7d4f] cursor-pointer font-['Montserrat']"
            aria-label={t.cartProceed}
          >
            <WhatsAppIcon />
            {t.cartProceed}
          </button>
          <p className="text-[10px] text-[#7A7A72] text-center leading-relaxed">{t.cartProceedNote}</p>
        </div>
      )}
    </>
  );
}

// ─── Step 2: Checkout Form ────────────────────────────────────────────────────

function CheckoutFormStep({ totalPrice, onBack, onSubmit, t }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '', note: '' });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = t.formNameRequired;
    if (!form.phone.trim()) errs.phone = t.formPhoneRequired;
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = t.formPhoneInvalid;
    if (!form.address.trim()) errs.address = t.formAddressRequired;
    if (!form.city.trim()) errs.city = t.formCityRequired;
    if (!form.pincode.trim()) errs.pincode = t.formPincodeRequired;
    else if (!/^\d{6}$/.test(form.pincode.trim())) errs.pincode = t.formPincodeInvalid;
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit(form);
  }

  return (
    <>
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E4DC]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} aria-label={t.formBack} className="p-1 text-[#7A7A72] hover:text-[#2C2C2C] transition-colors duration-200 cursor-pointer">
            <BackIcon />
          </button>
          <div>
            <h2 className="font-['Montserrat'] text-xs tracking-[0.15em] uppercase text-[#2C2C2C]">{t.formTitle}</h2>
            <p className="text-[11px] text-[#7A7A72] mt-0.5">{t.formStep}</p>
          </div>
        </div>
        <div className="font-['Montserrat'] text-sm font-normal text-[#2C2C2C]">₹{totalPrice}</div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4" noValidate>
        <p className="text-[11px] text-[#7A7A72] leading-relaxed">{t.formIntro}</p>

        <FormField label={t.formName} name="name" type="text" placeholder={t.formNamePlaceholder} value={form.name} error={errors.name} onChange={handleChange} required />
        <FormField label={t.formPhone} name="phone" type="tel" placeholder={t.formPhonePlaceholder} value={form.phone} error={errors.phone} onChange={handleChange} required />

        {/* Address textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-[0.15em] uppercase text-[#7A7A72] font-['Montserrat']">
            {t.formAddress} <span className="text-[#6B8F5E]">*</span>
          </label>
          <textarea
            name="address" value={form.address} onChange={handleChange}
            placeholder={t.formAddressPlaceholder} rows={2}
            className={`w-full text-xs text-[#2C2C2C] placeholder:text-[#C8C8C0] border px-3 py-2.5 outline-none resize-none transition-colors duration-200 focus:border-[#6B8F5E] font-light leading-relaxed ${errors.address ? 'border-red-300' : 'border-[#E4E4DC]'}`}
          />
          {errors.address && <p className="text-[10px] text-red-400">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label={t.formCity} name="city" type="text" placeholder={t.formCityPlaceholder} value={form.city} error={errors.city} onChange={handleChange} required />
          <FormField label={t.formPincode} name="pincode" type="text" placeholder={t.formPincodePlaceholder} value={form.pincode} error={errors.pincode} onChange={handleChange} required />
        </div>

        {/* Note */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-[0.15em] uppercase text-[#7A7A72] font-['Montserrat']">
            {t.formNote} <span className="text-[#AEAEA6] normal-case tracking-normal">{t.formNoteOptional}</span>
          </label>
          <textarea
            name="note" value={form.note} onChange={handleChange}
            placeholder={t.formNotePlaceholder} rows={2}
            className="w-full text-xs text-[#2C2C2C] placeholder:text-[#C8C8C0] border border-[#E4E4DC] px-3 py-2.5 outline-none resize-none transition-colors duration-200 focus:border-[#6B8F5E] font-light leading-relaxed"
          />
        </div>

        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#6B8F5E] text-white text-xs tracking-[0.15em] uppercase py-4 transition-all duration-[400ms] hover:bg-[#5a7d4f] cursor-pointer font-['Montserrat'] mt-2">
          <WhatsAppIcon />
          {t.formSubmit}
        </button>
        <p className="text-[10px] text-[#7A7A72] text-center leading-relaxed pb-2">{t.formSubmitNote}</p>
      </form>
    </>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────

function FormField({ label, name, type, placeholder, value, error, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[0.15em] uppercase text-[#7A7A72] font-['Montserrat']">
        {label} {required && <span className="text-[#6B8F5E]">*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full text-xs text-[#2C2C2C] placeholder:text-[#C8C8C0] border px-3 py-2.5 outline-none transition-colors duration-200 focus:border-[#6B8F5E] font-light ${error ? 'border-red-300' : 'border-[#E4E4DC]'}`}
      />
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

// ─── Cart Item ────────────────────────────────────────────────────────────────

function CartItem({ item, onRemove, onQuantityChange, t }) {
  return (
    <li className="flex gap-3">
      <div className="w-16 h-16 flex-shrink-0 bg-[#F5F5F0] flex items-center justify-center">
        {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <PlaceholderThumb />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-['Montserrat'] tracking-[0.08em] uppercase text-[#2C2C2C] truncate">{item.name}</p>
            {item.selectedVariant && <p className="text-[11px] text-[#7A7A72] mt-0.5">{item.selectedVariant.label}</p>}
          </div>
          <button onClick={onRemove} aria-label={`Remove ${item.name}`} className="flex-shrink-0 text-[#C8C8C0] hover:text-[#7A7A72] transition-colors duration-200 cursor-pointer mt-0.5">
            <RemoveIcon />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <QuantityControl quantity={item.quantity} onDecrease={() => onQuantityChange(item.quantity - 1)} onIncrease={() => onQuantityChange(item.quantity + 1)} />
          <span className="text-xs font-['Montserrat'] text-[#2C2C2C]">₹{item.price * item.quantity}</span>
        </div>
      </div>
    </li>
  );
}

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center border border-[#E4E4DC]">
      <button onClick={onDecrease} aria-label="Decrease quantity" className="w-7 h-7 flex items-center justify-center text-[#7A7A72] hover:text-[#2C2C2C] hover:bg-[#F5F5F0] transition-colors duration-200 cursor-pointer text-sm">−</button>
      <span className="w-7 h-7 flex items-center justify-center text-xs text-[#2C2C2C] font-['Montserrat'] border-x border-[#E4E4DC]">{quantity}</span>
      <button onClick={onIncrease} aria-label="Increase quantity" className="w-7 h-7 flex items-center justify-center text-[#7A7A72] hover:text-[#2C2C2C] hover:bg-[#F5F5F0] transition-colors duration-200 cursor-pointer text-sm">+</button>
    </div>
  );
}

function EmptyCart({ t }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
      <div className="w-16 h-16 rounded-full border border-[#E4E4DC] flex items-center justify-center"><CartEmptyIcon /></div>
      <p className="font-['Montserrat'] text-xs tracking-[0.12em] uppercase text-[#7A7A72]">{t.cartEmpty}</p>
      <p className="text-xs text-[#7A7A72] font-light max-w-[180px] leading-relaxed">{t.cartEmptyDesc}</p>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}
function BackIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
}
function RemoveIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}
function WhatsAppIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>;
}
function CartEmptyIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cccccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>;
}
function PlaceholderThumb() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dddddd" strokeWidth="1" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
}
