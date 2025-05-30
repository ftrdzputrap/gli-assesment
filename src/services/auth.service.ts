import axiosInstance from "@/interceptor";
import ILoginPayload from "@/interfaces/auth/LoginPayload";
import ILoginResponse from "@/interfaces/auth/LoginResponse";

export const signIn = async (payload: ILoginPayload) => {
  const { data } = await axiosInstance.post<ILoginResponse>(
    `/auth/login`,
    payload
  );
  return data;
};
