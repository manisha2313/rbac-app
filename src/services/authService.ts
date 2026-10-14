import api from "./api";
const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post("/api/auth/login", {
      username,
      password,
    });
    return response.data;
  },
  register: async (username: string, password: string) => {
    const response = await api.post("/api/auth/register", {
      username,
      password,
    });
    return response.data;
  },
  forgotPassword: async (username: string) => {
    const response = await api.post("/api/auth/forgot-password", { username });
    return response.data;
  },
};

export default authService;
