import api from "./index";

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

// Send password reset email
export const forgotPassword = async (email) => {
  const response = await api.post("/forgot-password", { email });
  return response.data;
};

// Reset password
export const resetPassword = async (data) => {
  // data should contain token, new_password, password_confirmation
  const response = await api.post("/reset-password", data);
  return response.data;
};
