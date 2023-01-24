import { setCookies } from "cookies-next";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Login: NextPage = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  const AUTH_URL = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read";

  const LOGIN_URL = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }

    const { hash } = window.location;
    if (hash) {
      let token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"));

      if (!token) return;

      token = token.split("=")[1];

      window.location.hash = "";
      setCookies("token", token);

      router.reload();
      router.push("/");
    }
  }, [router, isAuth]);

  return (
    <div className="mx-2 flex h-screen text-center">
      <div className="m-auto">
        <h1 className="mb-8 font-bold text-7xl">Welcome</h1>
        <p className="mb-12 font-light">
          Don&lsquo;t wait till New Year&lsquo;s for Spotify Wrapped, get all
          the data you need now!
        </p>
        <button
          onClick={() => {
            router.push(LOGIN_URL);
          }}
          className="rounded-full bg-green py-4 px-16 font-bold text-lg text-white hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Login;
