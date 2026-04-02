// project API helpers
import axiosInstance from "./axios";

export const getProjects = async () => {
  const response = await axiosInstance.get("projects/");
  return response.data;
};

export const getFeaturedProjects = async () => {
  const response = await axiosInstance.get("projects/featured/");
  return response.data;
};

export const getProjectDetails = async (slug) => {
  const response = await axiosInstance.get(`projects/${slug}/`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get("categories/");
  return response.data;
};

export const getSkills = async () => {
  const response = await axiosInstance.get("skills/");
  return response.data;
};