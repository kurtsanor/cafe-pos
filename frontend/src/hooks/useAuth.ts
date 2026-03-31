import { useQuery } from "@tanstack/react-query";
import { refreshToken } from "../api/auth.api";
import { setAccessToken } from "../store/auth.store";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await refreshToken();

      if (!response.data) {
        console.log("useAuth: no response data");
        return false;
      }
      setAccessToken(response.data?.accessToken);
      return true;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
