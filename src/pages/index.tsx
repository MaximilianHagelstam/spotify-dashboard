import { removeCookies } from "cookies-next";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Home: NextPage = () => {
  const router = useRouter();
  const { isAuth, user, loading } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [router, isAuth]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <button
        onClick={() => {
          removeCookies("token");
          router.reload();
        }}
      >
        Logout
      </button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Home;
