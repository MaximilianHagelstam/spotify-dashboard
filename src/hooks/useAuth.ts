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
        throw new Error("Unexpected response");
      }

      const data = await res.json();
      return data.items;
    });

  return {
    token,
    isAuth,
    fetcher,
  };
};

export default useAuth;
