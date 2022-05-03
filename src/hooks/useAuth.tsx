import { getCookie } from "cookies-next";
import useSWR from "swr";
import User from "../interfaces/User";

const useAuth = () => {
  const token = getCookie("token");

  const fetcher = (apiUrl: string) =>
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error("An error occurred while fetching the data.");
      }
      return res.json();
    });

  const { data, error, isValidating } = useSWR<User>(
    "https://api.spotify.com/v1/me",
    fetcher
  );

  const isAuth = token !== undefined && !error;

  return {
    token,
    isAuth,
    error,
    user: data,
    loading: isValidating,
    fetcher,
  };
};

export default useAuth;
