import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Login: NextPage = () => {
  const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  const SCOPE = "user-top-read";

  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [router, isAuth]);

  return (
    <div className="mx-2 flex h-screen text-center">
      <div className="m-auto">
        <h1 className="mb-8 text-7xl font-bold">Welcome</h1>
        <p className="mb-12 font-light">
          Don&lsquo;t wait till New Year&lsquo;s for Spotify Wrapped, get all
          the data you need now!
        </p>
        <a
          href={`https://accounts.spotify.com/authorize/?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`}
          className="rounded-full bg-green py-4 px-16 text-lg font-bold text-white hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Login;
