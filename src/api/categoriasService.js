import api from "./apiClient";
/**
 * Obtiene la lista de categorías.
 * @returns {Promise<Array>} Lista de categorías
 */
export const getCategorias = async () => {
  const res = await api.get("/categorias");
  return res.data.data;
};

/**
 * Crea una nueva categoría. Solo los usuarios administradores
 * @param {object} payload Datos de la categoría
 * @returns {Promise<object>} Categoría creada
 */
export const createCategoria = async (payload) => {
  const res = await api.post("/categorias", payload);
  return res.data.data;
};

/**
 * Elimina una categoría por su ID. Devuelve el mensaje de la API.
 * @param {number|string} id Identificador de la categoría
 * @returns {Promise<string>} Mensaje de eliminación
 */
export const deleteCategoria = async (id) => {
  const res = await api.delete(`/categorias/${id}`);
  return res.data.message;
};