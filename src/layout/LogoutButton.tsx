import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      className="bg-green font-bold py-2 px-4 rounded-full hover:bg-green hover:scale-105"
      onClick={() => {
        removeCookies("token");
        router.reload();
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
