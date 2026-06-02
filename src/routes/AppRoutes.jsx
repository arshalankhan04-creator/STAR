import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import NotFound from '../pages/NotFound/NotFound';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
