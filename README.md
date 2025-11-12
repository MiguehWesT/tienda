# 🛒 TechStore - E-commerce Platform

Integrante:

Miguel Trujillo

### 🛍️ Funcionalidades de Usuario
- ✅ **Catálogo de productos** con búsqueda y filtros
- ✅ **Sistema de categorías** para organizar productos
- ✅ **Carrito de compras** completamente funcional
- ✅ **Proceso de checkout** en 3 pasos (Envío → Pago → Confirmación)
- ✅ **Sistema de ofertas** con productos en descuento
- ✅ **Autenticación** de usuarios (Login/Registro)
- ✅ **Blog** con artículos sobre tecnología
- ✅ **Páginas institucionales** (Nosotros, Contacto)
- ✅ **Diseño responsive** para todos los dispositivos

### 👨‍💼 Panel Administrativo
- ✅ **Dashboard** con métricas clave
- ✅ **CRUD completo** de productos
- ✅ **Gestión de usuarios** y roles
- ✅ **Gestión de categorías**
- ✅ **Administración de órdenes** con cambio de estados
- ✅ **Reportes y estadísticas** (ventas, productos más vendidos)
- ✅ **Historial completo** de compras

### 🎨 Características Técnicas
- ✅ **Atomic Design** - Arquitectura escalable y mantenible
- ✅ **Context API** - Gestión de estado global
- ✅ **Testing unitario** con Karma + Jasmine
- ✅ **Formato CLP** (Peso Chileno) con Intl.NumberFormat
- ✅ **Single Page Application (SPA)**
- ✅ **Componentes reutilizables**

## 🚀 Tecnologías

### Frontend
- **React** 18.x - Biblioteca de UI
- **JavaScript** - Lenguaje de programación
- **CSS3** - Estilos puros sin preprocesadores

### Testing
- **Karma** - Test runner
- **Jasmine** - Framework de testing
- **@testing-library/react** - Utilidades para testing de React



El proyecto sigue la metodología **Atomic Design**:

## 📦 Instalación

### Prerequisitos

- Node.js >= 14.x
- npm >= 6.x

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/miguehwest/tienda.git
cd tienda
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm start
```

4. **Abrir en navegador**
```
http://localhost:3000
```

---

## 💻 Uso

### Comandos Disponibles

# Iniciar servidor de desarrollo
npm start

# Build para producción
npm run build

# Ejecutar tests con Karma
npx karma start



## 🧪 Testing

### Ejecutar Tests

npx karma start

### Cobertura de Tests

El proyecto incluye **61 pruebas unitarias** que cubren:

- ✅ **Atoms** (Button, Input, Badge) - 21 pruebas
- ✅ **Molecules** (ProductCard, FormGroup, CartItem) - 12 pruebas
- ✅ **Context** (AppProvider, funciones del carrito) - 6 pruebas
- ✅ **Pages** (HomePage, CartPage, LoginPage) - 17 pruebas
- ✅ **Integración** (Flujo de compra completo) - 2 pruebas
- ✅ **App principal** - 3 pruebas



## 📈 Roadmap

### v1.0 (Actual) ✅
- [x] Catálogo de productos
- [x] Carrito de compras
- [x] Checkout funcional
- [x] Panel administrativo
- [x] Sistema de autenticación
- [x] Tests unitarios

### v1.1 (Próximo)
- [ ] Integración con backend (API REST)
- [ ] Persistencia de datos (base de datos)
- [ ] Autenticación con JWT
- [ ] Pasarela de pago real
- [ ] Envío de emails
- [ ] Recuperación de contraseña

### v2.0 (Futuro)
- [ ] Sistema de reviews y calificaciones
- [ ] Wishlist (lista de deseos)
- [ ] Comparador de productos
- [ ] Chat de soporte
- [ ] Notificaciones push
- [ ] Multi-idioma (i18n)
- [ ] Dark mode
- [ ] PWA (Progressive Web App)
