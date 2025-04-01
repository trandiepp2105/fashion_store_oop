import apiClient from "./apiClient";

const paymentService = {
  async createPayment(data) {
    try {
      const response = await apiClient.post("order/payment", {
        order_type: "pay_ticket",
        order_id: 13,
        amount: 200000,
        order_desc: "Payment for ticket",
        bank_code: "VNBANK",
        language: "vn",
      });
      window.location.href = response.data.url;
      console.log("payment response", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentService;
