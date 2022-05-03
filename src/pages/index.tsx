import { removeCookies } from "cookies-next";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import useAuth from "../hooks/useAuth";

const Home: NextPage = () => {
  const router = useRouter();
  const { isAuth, fetcher } = useAuth();

  const { data, isValidating } = useSWR(
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5",
    fetcher
  );

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [router, isAuth]);

  if (isValidating) return <p>Loading...</p>;

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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Home;
