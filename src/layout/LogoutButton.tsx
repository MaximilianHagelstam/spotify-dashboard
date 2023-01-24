import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      className="rounded-full bg-green py-2 px-4 text-sm font-bold hover:scale-105 hover:bg-green"
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
