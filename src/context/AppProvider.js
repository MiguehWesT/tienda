import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

// Servicios API
import { getUsuarios } from "../api/usuariosService";

import {
  login as loginService,
  register as registerService,
  verifyToken as verifyTokenService,
  logout as logoutService,
} from "../api/authService";

import { crearBoleta, getBoletas } from "../api/boletasService";

const API_BASE = "http://3.236.252.150:3000/api/v1";

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");

  // Auth
  const [user, setUser] = useState(null);

  // Carrito
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1);

  // Datos
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  const [users, setUsers] = useState([]);

  // Boletas (ordenes)
  const [orders, setOrders] = useState([]);

  // Estado global
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token && storedUser) {
          setUser(JSON.parse(storedUser));
          return;
        }

        if (!token) return;

        const decodedUser = await verifyTokenService();
        setUser(decodedUser);
      } catch (err) {
        console.error("Error verificando token:", err);
        logoutService();
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();
  }, []);

  //   Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          prodRes,
          catRes,
          blogRes,
          boletasData,
          usuariosData
        ] = await Promise.all([
          fetch(`${API_BASE}/productos`),
          fetch(`${API_BASE}/categorias`),
          fetch(`${API_BASE}/blog`),
          getBoletas().catch(() => []),
          getUsuarios().catch(() => []) // ⬅️ NUEVO
        ]);

        const [prodJson, catJson, blogJson] = await Promise.all([
          prodRes.json(),
          catRes.json(),
          blogRes.json(),
        ]);

        const mappedProducts = (prodJson.data || []).map((p) => ({
          id: p.id,
          name: p.name || p.nombre,
          price: Number(p.price ?? p.precio) || 0,
          image: p.image || p.imagen,
          stock: p.stock,
          discount: p.discount ?? p.descuento ?? 0,
          featured: p.featured ?? p.destacado ?? false,
          category: p.category || p.categoria_nombre || "",
        }));

        setProducts(mappedProducts);


        const mappedCategories = (catJson.data || []).map((c) => ({
          id: c.id,
          name: c.nombre,
          label: c.label,
          count: mappedProducts.filter(
            (p) => p.category === c.nombre
          ).length,
        }));

        setCategories(mappedCategories);

        setBlogPosts(blogJson.data || []);


        setOrders(boletasData);


        setUsers(usuariosData);

      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("No se pudieron cargar los datos del servidor.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  //   Crear boleta / compra
  const confirmarCompra = async (formData) => {
    if (cart.length === 0) {
      throw new Error("El carrito está vacío");
    }

    const items = cart.map((item) => ({
      producto_id: item.id,
      cantidad: item.quantity,
    }));

    const payload = {
      usuario_id: user?.id || null,
      nombre_cliente: formData.name,
      email_cliente: formData.email,
      direccion: formData.address,
      ciudad: formData.city,
      codigo_postal: formData.postalCode,
      items,
    };

    const boleta = await crearBoleta(payload);

    setOrders((prev) => [...prev, boleta]);

    setCart([]);
    return boleta;
  };


  //   AUTH: login / register

  const login = async (email, password) => {
    setError(null);
    try {
      const loggedUser = await loginService(email, password);
      if (!loggedUser) {
        throw new Error("Credenciales inválidas");
      }

      const userNormalized = {
        ...loggedUser,
        name: loggedUser.name || loggedUser.nombre || "",
        role: loggedUser.role || loggedUser.rol || "cliente",
      };

      setUser(userNormalized);
      return userNormalized;
    } catch (err) {
      console.error("Error en login (AppProvider):", err);
      throw err;
    }
  };

  const register = async (nombre, email, password) => {
    setError(null);
    try {
      const newUser = await registerService(nombre, email, password);
      if (!newUser) {
        throw new Error("No se pudo registrar el usuario");
      }
      setUser(newUser);
      return newUser;
    } catch (err) {
      console.error("Error en register (AppProvider):", err);
      throw err;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  //   CONTEXTO GLOBAL

  const value = {
    currentPage,
    setCurrentPage,

    user,
    setUser,
    login,
    register,
    logout,
    authLoading,

    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,

    selectedProduct,
    setSelectedProduct,
    checkoutStep,
    setCheckoutStep,

    products,
    categories,
    blogPosts,

    orders,
    confirmarCompra,

    users,
    setUsers,

    loading,
    error,
    setError,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
