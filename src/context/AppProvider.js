import React, { useState } from 'react';
import AppContext from './AppContext';

export const AppProvider = ({ children }) => {

  // ESTADOS
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1);

  // PRODUCTOS
const [products, setProducts] = useState([
  { 
    id: 1, 
    name: 'RTX 5070 ASUS PRIME', 
    price: 800000, 
    category: 'componentes', 
    image: '/images/products/grafica.png', // ← Cambiado
    stock: 15, 
    featured: true, 
    discount: 10 
  },
  { 
    id: 2, 
    name: 'PROCESADOR RYZEN 7 7800X3D', 
    price: 400000, 
    category: 'componentes', 
    image: '/images/products/procesador.png', // ← Cambiado
    stock: 25, 
    featured: true 
  },
  { 
    id: 3, 
    name: 'PROCESADOR RYZEN 9 9900X3D', 
    price: 700000, 
    category: 'componentes', 
    image: '/images/products/procesador2.png', // ← Cambiado
    stock: 50 
  },
  { 
    id: 4, 
    name: 'MONITOR 4K ASUS ROG', 
    price: 600000, 
    category: 'perifericos', 
    image: '/images/products/monitor.png', // ← Cambiado
    stock: 30, 
    discount: 15 
  },
  { 
    id: 5, 
    name: 'FUENTE DE PODER EVGA 750GS', 
    price: 90000, 
    category: 'componentes', 
    image: '/images/products/fuente.png', // ← Cambiado
    stock: 20, 
    featured: true 
  },
  { 
    id: 6, 
    name: 'GABINETE LIAN LI DYNAMIC 011 ROG', 
    price: 200000, 
    category: 'componentes', 
    image: '/images/products/gabinete.jpg', // ← Cambiado
    stock: 18 
  },
  { 
    id: 7, 
    name: 'RTX 5080 ROG ASTRAL', 
    price: 1800000, 
    category: 'componentes', 
    image: '/images/products/grafica2.png', // ← Cambiado
    stock: 100, 
    discount: 20 
  },
  { 
    id: 8, 
    name: 'Teclado Mecánico RAZER BLACKWIDOW V4', 
    price: 150000, 
    category: 'perifericos', 
    image: '/images/products/teclado.png', // ← Cambiado
    stock: 45 
  },
  { 
    id: 9, 
    name: 'AUDIFONOS GAMING ASTRO A50', 
    price: 160000, 
    category: 'perifericos', 
    image: '/images/products/audifonos.png', // ← Cambiado
    stock: 12, 
    featured: true 
  },
  { 
    id: 10, 
    name: 'MOUSE GAMING RAZER VIPER ULTIMATE', 
    price: 120000, 
    category: 'perifericos', 
    image: '/images/products/mouse.png', // ← Cambiado
    stock: 80 
  }
]);

  // CATEGORÍAS
  const [categories, setCategories] = useState([
    { id: 1, name: 'componentes', label: 'Componentes', count: 6 },
    { id: 2, name: 'perifericos', label: 'Perifericos', count: 4 }
  ]);

  // ÓRDENES
  const [orders, setOrders] = useState([]);

  // USUARIOS
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@store.com', password: 'admin123', name: 'Admin', role: 'admin' },
    { id: 2, email: 'user@example.com', password: 'user123', name: 'Usuario Test', role: 'user' }
  ]);

  // BLOG
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'Las mejores laptops de 2025', excerpt: 'Descubre nuestra selección de las mejores laptos calidad precio de este 2025', date: '12-9-2025', image: '💻' },
    { id: 2, title: 'Guía de compra: Smartphones', excerpt: 'Todo lo que necesitas saber al elegir un smartphone', date: '05-10-2025', image: '📱' },
    { id: 3, title: 'Accesorios imprescindibles', excerpt: 'Accesorios que no pueden faltar en tu setup', date: '12-10-2025', image: '🎧' }
  ]);

  // FUNCIONES DEL CARRITO

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
      return total + (price * item.quantity);
    }, 0);
  };


  // FUNCIONES DE ÓRDENES

  const placeOrder = (orderData) => {
    const order = {
      id: orders.length + 1,
      userId: user?.id,
      items: [...cart],
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'completed',
      ...orderData
    };
    setOrders([...orders, order]);
    setCart([]);
    return order;
  };

  // VALOR DEL CONTEXTO

  const value = {
    // Estados
    currentPage,
    setCurrentPage,
    user,
    setUser,
    cart,
    selectedProduct,
    setSelectedProduct,
    checkoutStep,
    setCheckoutStep,
    products,
    setProducts,
    categories,
    setCategories,
    orders,
    setOrders,
    users,
    setUsers,
    blogPosts,
    setBlogPosts,
    
    // Funciones
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    placeOrder
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};