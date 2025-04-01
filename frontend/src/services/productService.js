import apiClient from "./apiClient";

const productService = {
  getAllCategories: async () => {
    try {
      const response = await apiClient.get("product/categories");
      return response.data;
    } catch (error) {
      console.error("Error while fetching categories", error);
      return;
    }
  },

  getSubCategories: async (categoryName) => {
    try {
      const response = await apiClient.get(
        `product/categories?category_name=${categoryName}`
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching subcategories", error);
      return;
    }
  },

  searchProductsByCategory: async (categoryName, page = 1, url = null) => {
    var endpoint = "";
    if (url) {
      endpoint = url;
    } else {
      endpoint =
        page > 1
          ? `product/products?category_name=${categoryName}&page=${page}`
          : `product/products?category_name=${categoryName}`;
    }
    try {
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error while fetching products by category", error);
      return;
    }
  },

  getProductsByTagName: async (tagName, page = 1, url = null) => {
    var endpoint = "";
    if (url) {
      endpoint = url;
    } else {
      endpoint =
        page > 1
          ? `product/products?tag_name=${tagName}&page=${page}`
          : `product/products?tag_name=${tagName}`;
    }
    try {
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error while fetching products by tag", error);
      return;
    }
  },
  getAllProducts: async () => {
    const response = await apiClient.get("product/products");
    return response.data;
  },

  getProductById: async (id) => {
    const response = await apiClient.get(`product/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await apiClient.post("/products", productData);
    return response.data;
  },

  updateProduct: async (productId, productData) => {
    const response = await apiClient.put(`/products/${productId}`, productData);
    return response.data;
  },

  deleteProduct: async (productId) => {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
  },
};

export default productService;
