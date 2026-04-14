import axiosInstance from "./axios";

export const submitContactMessage = async (payload) => {
  const response = await axiosInstance.post("contact/submit", payload);
  return response.data;
};
