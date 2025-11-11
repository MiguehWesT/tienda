import React from 'react';
import { useApp } from '../context/AppContext';

// Importar todas las páginas
import HomePage from '../pages/public/HomePage';
import ProductsPage from '../pages/public/ProductsPage';
import ProductDetailPage from '../pages/public/ProductDetailPage';
import CategoriesPage from '../pages/public/CategoriesPage';
import CartPage from '../pages/public/CartPage';
import CheckoutPage from '../pages/public/CheckoutPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import AboutPage from '../pages/public/AboutPage';
import BlogPage from '../pages/public/BlogPage';
import ContactPage from '../pages/public/ContactPage';
import OffersPage from '../pages/public/OffersPage';
import SuccessPage from '../pages/public/SuccessPage';
import ErrorPage from '../pages/public/ErrorPage';
import AdminPage from '../pages/admin/AdminPage';

const AppRouter = () => {
  const { currentPage } = useApp();

  const pages = {
    home: <HomePage />,
    products: <ProductsPage />,
    'product-detail': <ProductDetailPage />,
    categories: <CategoriesPage />,
    cart: <CartPage />,
    checkout: <CheckoutPage />,
    login: <LoginPage />,
    register: <RegisterPage />,
    about: <AboutPage />,
    blog: <BlogPage />,
    contact: <ContactPage />,
    offers: <OffersPage />,
    success: <SuccessPage />,
    error: <ErrorPage />,
    admin: <AdminPage />
  };

  return pages[currentPage] || <HomePage />;
};

export default AppRouter;