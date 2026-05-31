import { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { openWhatsAppOrder } from '../../utils/whatsappMessage';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const drawerRef = useRef(null);

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  function handleOrder() {
    if (items.length === 0) return;
    openWhatsAppOrder(items);
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
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white flex flex-col transition-transform duration-[400ms] ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e8e8]">
          <div>
            <h2 className="font-['Montserrat'] text-xs tracking-[0.15em] uppercase text-[#555555]">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <p className="text-[11px] text-[#888888] mt-0.5">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 text-[#888888] hover:text-[#222222] transition-colors duration-200 cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <CartItem
                  key={item.key}
                  item={item}
                  onRemove={() => removeItem(item.key)}
                  onQuantityChange={(qty) => updateQuantity(item.key, qty)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e8e8e8] px-6 py-5 flex flex-col gap-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.1em] uppercase text-[#888888] font-['Montserrat']">
                Total
              </span>
              <span className="font-['Montserrat'] text-base font-light text-[#555555]">
                ₹{totalPrice}
              </span>
            </div>

            {/* WhatsApp Order Button */}
            <button
              onClick={handleOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#8FA882] text-white text-xs tracking-[0.15em] uppercase py-4 transition-all duration-[400ms] hover:bg-[#7a9470] cursor-pointer"
              aria-label="Place order on WhatsApp"
            >
              <WhatsAppIcon />
              Order on WhatsApp
            </button>

            <p className="text-[10px] text-[#888888] text-center leading-relaxed">
              You will be redirected to WhatsApp with your order details pre-filled.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

// ─── Cart Item ────────────────────────────────────────────────────────────────

function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <li className="flex gap-3">
      {/* Thumbnail */}
      <div className="w-16 h-16 flex-shrink-0 bg-[#F4F6F3] flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderThumb />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-['Montserrat'] tracking-[0.08em] uppercase text-[#555555] truncate">
              {item.name}
            </p>
            {item.selectedVariant && (
              <p className="text-[11px] text-[#888888] mt-0.5">
                {item.selectedVariant.label}
              </p>
            )}
          </div>
          <button
            onClick={onRemove}
            aria-label={`Remove ${item.name} from cart`}
            className="flex-shrink-0 text-[#cccccc] hover:text-[#888888] transition-colors duration-200 cursor-pointer mt-0.5"
          >
            <RemoveIcon />
          </button>
        </div>

        {/* Quantity + Subtotal */}
        <div className="flex items-center justify-between mt-2">
          <QuantityControl
            quantity={item.quantity}
            onDecrease={() => onQuantityChange(item.quantity - 1)}
            onIncrease={() => onQuantityChange(item.quantity + 1)}
          />
          <span className="text-xs font-['Montserrat'] text-[#555555]">
            ₹{item.price * item.quantity}
          </span>
        </div>
      </div>
    </li>
  );
}

// ─── Quantity Control ─────────────────────────────────────────────────────────

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center border border-[#e8e8e8]">
      <button
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="w-7 h-7 flex items-center justify-center text-[#888888] hover:text-[#222222] hover:bg-[#FBFBFB] transition-colors duration-200 cursor-pointer text-sm"
      >
        −
      </button>
      <span className="w-7 h-7 flex items-center justify-center text-xs text-[#555555] font-['Montserrat'] border-x border-[#e8e8e8]">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="w-7 h-7 flex items-center justify-center text-[#888888] hover:text-[#222222] hover:bg-[#FBFBFB] transition-colors duration-200 cursor-pointer text-sm"
      >
        +
      </button>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
      <div className="w-16 h-16 rounded-full border border-[#e8e8e8] flex items-center justify-center">
        <CartEmptyIcon />
      </div>
      <p className="font-['Montserrat'] text-xs tracking-[0.12em] uppercase text-[#888888]">
        Your cart is empty
      </p>
      <p className="text-xs text-[#888888] font-light max-w-[180px] leading-relaxed">
        Browse our products and add something you love.
      </p>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

function CartEmptyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cccccc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function PlaceholderThumb() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dddddd" strokeWidth="1" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
