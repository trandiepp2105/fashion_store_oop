import apiClient from "./apiClient";
const userService = {
  login: async (loginData) => {
    try {
      await apiClient.post("/auth/login", loginData);
    } catch (error) {
      // if (error.response) {
      //   const { status, data } = error.response;
      //   if (status === 404 && data.detail === "User does not exist") {
      //     throw new Error("Tài khoản không tồn tại");
      //   } else if (status === 401 && data.detail === "Incorrect password") {
      //     throw new Error("Mật khẩu không đúng");
      //   }
      // }
      throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
      return true;
    } catch (error) {
      console.error("Error while logging out", error);
      return false;
    }
  },

  register: async (registerData) => {
    try {
      const res = await apiClient.post("/users", registerData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getInfo: async () => {
    try {
      const response = await apiClient.get("/user/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyEmail: async (email, otp) => {
    try {
      await apiClient.post("/user/verify-email", { email, otp });
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      await apiClient.post("/user/refresh-token");
    } catch (error) {
      throw error;
    }
  },

  sendResetPasswordEmail: async (email) => {
    try {
      await apiClient.post("/user/reset-password?step=1", { email });
    } catch (error) {
      throw error;
    }
  },

  verifyResetPasswordOTP: async (email, otp) => {
    try {
      await apiClient.post("/user/reset-password?step=2", { email, otp });
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (email, newPassword) => {
    try {
      await apiClient.post("/user/reset-password?step=3", {
        email: email,
        new_password: newPassword,
      });
    } catch (error) {
      throw error;
    }
  },

  // loginWithGoogle: async () => {
  //   try {
  //     await apiClient.post("/user/login/google", { tokenId });
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};

export default userService;
