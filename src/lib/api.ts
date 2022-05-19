import { CookieValueTypes } from "cookies-next/lib/types";
import Artist from "../interfaces/Artist";
import Track from "../interfaces/Track";

export const getTopTracks = async (
  token: CookieValueTypes,
  timeRange: "short_term" | "medium_term" | "long_term",
  limit: number,
  offset: number
): Promise<Track[]> => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status !== 200) {
    throw new Error("Unexpected response");
  }

  const data = await res.json();
  return data.items;
};

export const getTopArtists = async (
  token: CookieValueTypes,
  timeRange: "short_term" | "medium_term" | "long_term",
  limit: number,
  offset: number
): Promise<Artist[]> => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status !== 200) {
    throw new Error("Unexpected response");
  }

  const data = await res.json();
  return data.items;
};
