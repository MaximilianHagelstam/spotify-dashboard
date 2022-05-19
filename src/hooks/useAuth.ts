import { getCookie } from "cookies-next";

const useAuth = () => {
  const token = getCookie("token");
  const isAuth = token !== undefined;

  return {
    token,
    isAuth,
  };
};

export default useAuth;
