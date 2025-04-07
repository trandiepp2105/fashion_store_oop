import apiClient from "./apiClient";

const shippingInfoService = {
  getShippingInfo: async () => {
    try {
      const response = await apiClient.get("shipping_info");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addNewShippingInfo: async (shippingInfo) => {
    try {
      const response = await apiClient.post("shipping_info", shippingInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default shippingInfoService;
