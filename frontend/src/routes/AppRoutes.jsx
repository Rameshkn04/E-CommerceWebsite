import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage.jsx';
import { ProductDetailsPage } from '../pages/ProductDetailsPage.jsx';
import { CartPage } from '../pages/CartPage.jsx';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products/:productId" element={<ProductDetailsPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

