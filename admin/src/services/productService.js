import apiAdmin from "./apiAdmin";

const productService = {
  getProducts: async (params = {}) => {
    try {
      const response = await apiAdmin.get("/products/", {
        params: {
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProduct: async (productId) => {
    try {
      const response = await apiAdmin.get(`/products/${productId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createProduct: async (product) => {
    try {
      const response = await apiAdmin.post("/products/", product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (productId, product) => {
    try {
      const response = await apiAdmin.patch(
        `/products/${productId}/`,
        product,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await apiAdmin.delete(`/products/${productId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addVariant: async (productId, variant) => {
    try {
      const response = await apiAdmin.post(
        `/products/${productId}/variants/`,
        variant,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteVariant: async (productId, variantId) => {
    try {
      const response = await apiAdmin.delete(
        `/products/${productId}/variants/${variantId}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
