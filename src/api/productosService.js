import api from "./apiClient";
/**
 * Obtiene la lista de productos. 
 * @returns {Promise<Array>} Lista de productos
 */
export const getProductos = async () => {
  const res = await api.get("/productos");
  return res.data.data;
};

/**
 * Obtiene un producto por su ID. Devuelve el objeto de producto
 * @param {number|string} id Identificador del producto
 * @returns {Promise<object>} Producto
 */
export const getProductoById = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data.data;
};

/**
 * Crea un nuevo producto. Solo los usuarios administradores
 * @param {object} payload Datos del producto
 * @returns {Promise<object>} Producto creado
 */
export const createProducto = async (payload) => {
  const res = await api.post("/productos", payload);
  return res.data.data;
};

/**
 * Actualiza un producto existente por su ID. Devuelve el producto
 * actualizado.
 * @param {number|string} id Identificador del producto
 * @param {object} payload Datos a actualizar
 * @returns {Promise<object>} Producto actualizado
 */
export const updateProducto = async (id, payload) => {
  const res = await api.put(`/productos/${id}`, payload);
  return res.data.data;
};

/**
 * Elimina un producto por su ID. Devuelve el mensaje de la API.
 * @param {number|string} id
 * @returns {Promise<string>} Mensaje
 */
export const deleteProducto = async (id) => {
  const res = await api.delete(`/productos/${id}`);
  return res.data.message;
};