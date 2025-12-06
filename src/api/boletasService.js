import api from "./apiClient";

/**
 * Crear nueva boleta
 */
export const crearBoleta = async (payload) => {
  const res = await api.post("/boletas", payload);
  return res.data.data;
};

/**
 * Obtener todas las boletas (solo admin)
 */
export const getBoletas = async () => {
  const res = await api.get("/boletas", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  
  return res.data.data || [];
};
