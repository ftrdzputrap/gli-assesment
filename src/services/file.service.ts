import axiosInstance from "@/interceptor";
import IFileParams from "@/interfaces/file/FileParams";
import IFileResponse from "@/interfaces/file/FileResponse";

export const postFile = async (params: IFileParams) => {
  const { data } = await axiosInstance.post<IFileResponse[]>(
    `/files/upload`,
    params,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
