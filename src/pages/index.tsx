import type { NextPage } from "next";
import { useEffect } from "react";

const getTokenFromUrl = (urlHash: string): string => {
  const accessToken = urlHash
    .substring(1)
    .split("&")
    .find((elem) => elem.startsWith("access_token"));

  if (!accessToken) {
    throw Error("No access token in url");
  }

  return accessToken.split("=")[1];
};

const Home: NextPage = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

  console.log(LOGIN_URL);

  useEffect(() => {
    const { hash } = window.location;
    let accessToken = window.localStorage.getItem("token");

    if (!accessToken && hash) {
      accessToken = getTokenFromUrl(hash);

      window.location.hash = "";
      window.localStorage.setItem("token", accessToken);
    }
  }, []);

  return (
    <>
      <a href={LOGIN_URL}>Login to Spotify</a>
    </>
  );
};

export default Home;
