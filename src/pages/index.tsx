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

  return <pre>{JSON.stringify(user)}</pre>;
};

export default Home;
