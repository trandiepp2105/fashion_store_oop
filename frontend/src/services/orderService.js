import apiClient from "./apiClient";

const orderService = {
  getOrder: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await apiClient.get("/orders");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post("/orders/", orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default orderService;
