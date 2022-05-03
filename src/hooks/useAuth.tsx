import { getCookie } from "cookies-next";
import useSWR from "swr";

const useAuth = () => {
  const token = getCookie("token");
  let isAuth = token !== undefined;

  const fetcher = (apiUrl: string) =>
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data, error, isValidating } = useSWR(
    "https://api.spotify.com/v1/me",
    fetcher
  );

  if (error) {
    isAuth = false;
  }

  return {
    token,
    isAuth,
    user: data,
    loading: isValidating,
    fetcher,
  };
};

export default useAuth;
