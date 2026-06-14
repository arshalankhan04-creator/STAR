import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import LanguagePopup from './components/LanguagePopup/LanguagePopup';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import MobileBottomNav from './components/MobileBottomNav/MobileBottomNav';
import IntroAnimation from './components/IntroAnimation/IntroAnimation';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <IntroAnimation />
          <ScrollToTop />
          <LanguagePopup />
          <div className="flex flex-col min-h-screen">
            <Navbar onCartOpen={() => setCartOpen(true)} />
            {/* pb-16 on mobile so content isn't hidden behind the bottom nav */}
            <div className="flex-1 pb-16 md:pb-0">
              <AppRoutes />
            </div>
            <Footer />
          </div>
          <MobileBottomNav />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
