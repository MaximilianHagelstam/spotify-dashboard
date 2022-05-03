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
  const SCOPE = "user-read-private";

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

  return <a href={LOGIN_URL}>Login to Spotify</a>;
};

export default Login;
