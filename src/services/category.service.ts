import axiosInstance from "@/interceptor";
import ICategoryResponse from "@/interfaces/category/CategoryResponse";

export const getCategory = async () => {
  const { data } = await axiosInstance.get<ICategoryResponse>(`/categories`);
  return data;
};
