import apiAdmin from "./apiAdmin";
const userService = {
  login: async (loginData) => {
    try {
      await apiAdmin.post("/auth/login", loginData);
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
      await apiAdmin.post("/auth/logout");
      return true;
    } catch (error) {
      console.error("Error while logging out", error);
      return false;
    }
  },

  changePassword: async (email, newPassword) => {
    try {
      await apiAdmin.post("/users/reset-password?step=3", {
        email: email,
        new_password: newPassword,
      });
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await apiAdmin.get("/users/");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await apiAdmin.get(`/users/${userId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await apiAdmin.delete(`/users/${userId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
