import axiosInstance from "@/interceptor";

import IProductCreateResponse from "@/interfaces/product/ProductCreateResponse";
import IProductParams from "@/interfaces/product/ProductParams";
import IProductPayload from "@/interfaces/product/ProductPayload";
import IProductDeleteResponse from "@/interfaces/product/ProductResponse";
import IProductResponse from "@/interfaces/product/ProductResponse";
import IProductUpdateResponse from "@/interfaces/product/ProductUpdateResponse";

export const getProduct = async (params: IProductParams) => {
  const { data } = await axiosInstance.get<IProductResponse[]>(`/products`, {
    params,
  });
  return data;
};

export const getProductDetail = async (id: number) => {
  const { data } = await axiosInstance.get<IProductResponse>(`/products/${id}`);
  return data;
};

export const postProduct = async (payload: IProductPayload) => {
  const { data } = await axiosInstance.post<IProductCreateResponse>(
    `/products`,
    payload
  );
  return data;
};

export const putProduct = async (id: number, payload: IProductPayload) => {
  const { data } = await axiosInstance.put<IProductUpdateResponse>(
    `/products/${id}`,
    payload
  );
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await axiosInstance.delete<IProductDeleteResponse>(
    `products/${id}`
  );
  return data;
};
