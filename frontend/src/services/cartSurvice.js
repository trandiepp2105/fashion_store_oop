import apiClient from "./apiClient";

const cartSurvice = {
  getShoppingCart: async () => {
    try {
      const response = await apiClient.get("/cart");
      return response.data;
    } catch (error) {
      console.error("Error while fetching categories", error);
      return;
    }
  },

  addProductToCart: async (productId, quantity, variantId = NaN) => {
    try {
      const response = await apiClient.post("/cart", {
        product_id: productId,
        quantity: quantity,
        variant_id: variantId,
      });
      return response.data;
    } catch (error) {
      console.error("Error while adding product to cart", error);
      return;
    }
  },

  removeCartItem: async (cartItemId) => {
    try {
      const response = await apiClient.delete(`/cart/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error("Error while removing cart item", error);
      return;
    }
  },

  removeCartItems: async (cartItemIds) => {
    try {
      const response = await apiClient.delete("/cart/bulk-delete", {
        data: {
          cart_item_ids: cartItemIds,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while removing cart item", error);
      return;
    }
  },

  getTemporaryInvoice: async (tempOrderInfor) => {
    try {
      const response = await apiClient.post("cart/temporary-invoice", {
        temp_order_infor: tempOrderInfor,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addWarrantyFeeToTemporaryInvoice: async (cartItemIds, warrantyId) => {
    try {
      const response = await apiClient.get("cart/temporary-invoice", {
        params: {
          cart_item_ids: cartItemIds.join(","),
          warranty_id: warrantyId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default cartSurvice;
