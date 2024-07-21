import { AxiosError } from "axios";
import useAuthContext from "./useAuthContext";

export default function useRequestErrorHandler() {
  const { unauthorizedError } = useAuthContext();

  return async function <T>(request: () => Promise<T>) {
    try {
      return await request();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status && error?.response?.status == 401) {
          console.log(
            "error getting signature for image upload @useUploadImage"
          );

          // console.log("error.status", error?.response?.status);
          unauthorizedError();
        }
      } else {
        throw error;
      }
    }
  };
}
