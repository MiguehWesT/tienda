import api from "./apiClient";

export const getUsuarios = async () => {
  const res = await api.get("/usuarios", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  

  return res.data.data || [];
};
export const deleteUsuario = async (id) => {
  const res = await api.delete(`/usuarios/${id}`);
  return res.data;
};

export const updateUsuario = async (id, payload) => {
  const res = await api.put(`/usuarios/${id}`, payload);
  return res.data;
}