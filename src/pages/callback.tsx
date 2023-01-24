import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");

const getAccessToken = async (code: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
  });
  const data = await response.json();
  return data;
};

export default function Callback() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code && typeof code === "string") {
      getAccessToken(code).then((res) => {
        if (res.access_token) {
          console.log(res);
          setCookie("token", res.access_token);
          router.push("/");
        } else {
          console.log("error");
        }
      });
    } else {
      router.push("/login");
    }
  }, [code, router]);

  return (
    <div className="grid-rows-home bg-gray-100 index-bg grid h-screen flex-col items-center justify-center">
      <span>one sec. redirecting... </span>
    </div>
  );
}
