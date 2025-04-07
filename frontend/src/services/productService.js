import apiClient from "./apiClient";

const productService = {
  getNewArrivalProducts: async (limit = 20) => {
    try {
      const response = await apiClient.get(`/products/latest?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching new arrival products", error);
      return;
    }
  },

  getBestSellingProducts: async (limit = 20) => {
    try {
      const response = await apiClient.get(
        `/products/best-sellers?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching best selling products", error);
      return;
    }
  },

  getProducts: async (params = {}) => {
    try {
      const response = await apiClient.get("/products", { params });
      return response.data;
    } catch (error) {
      console.error("Error while fetching products", error);
      return;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching product by ID", error);
      return;
    }
  },

  getProductSales: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}/sales`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching product sales", error);
      return;
    }
  },
};

export default productService;
