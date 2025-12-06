import api from "./apiClient";
/**
  @returns {Promise<Array>} Lista de posts de blog
 */
export const getBlogPosts = async () => {
  const res = await api.get("/blog");
  return res.data.data;
};

/**
  @param {number|string} id Identificador del post
  @returns {Promise<object>} Post de blog
 */

export const getBlogPostById = async (id) => {
  const res = await api.get(`/blog/${id}`);
  return res.data.data;
};
