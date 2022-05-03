import { getCookie } from "cookies-next";

const useAuth = () => {
  const token = getCookie("token");
  const isAuth = token !== undefined;

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

  return {
    token,
    isAuth,
    fetcher,
  };
};

export default useAuth;
