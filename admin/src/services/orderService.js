import apiAdmin from "./apiAdmin";
const orderService = {
  getOrders: async () => {
    try {
      const response = await apiAdmin.get("/orders/");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrder: async (orderId) => {
    try {
      const response = await apiAdmin.get(`/orders/${orderId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createOrder: async (order) => {
    try {
      const response = await apiAdmin.post("/orders/", order);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrder: async (orderId, order) => {
    try {
      const response = await apiAdmin.put(`/orders/${orderId}/`, order);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (orderId) => {
    try {
      const response = await apiAdmin.put(`/orders/${orderId}/status/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteOrder: async (orderId) => {
    try {
      const response = await apiAdmin.delete(`/orders/${orderId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getOrderStatuses: async () => {
    try {
      const response = await apiAdmin.get("/orders/statuses/");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;
