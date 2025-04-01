import apiClient from "./apiClient";

const cartSurvice = {
  getShoppingCart: async () => {
    try {
      const response = await apiClient.get("cart/cart");
      return response.data;
    } catch (error) {
      console.error("Error while fetching categories", error);
      return;
    }
  },

  addProductToCart: async (productId, quantity, variantId = NaN) => {
    try {
      const response = await apiClient.post("cart/cart", {
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

  adjustCartItemInformation: async (cartItemId, quantity, variantId = NaN) => {
    try {
      const response = await apiClient.patch(`cart/cart/${cartItemId}`, {
        quantity: quantity,
        variant_id: variantId,
      });
      return response.data;
    } catch (error) {
      console.error("Error while adjusting cart item quantity", error);
      return;
    }
  },

  removeCartItem: async (cartItemIds) => {
    try {
      const response = await apiClient.delete("cart/cart", {
        data: {
          cart_item_id: cartItemIds,
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
