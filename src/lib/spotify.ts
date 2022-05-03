const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async (): Promise<string> => {
  const response = await fetch(
    `${TOKEN_ENDPOINT}?grant_type=refresh_token&refresh_token=${refresh_token}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token } = await response.json();
  return access_token;
};

export const getTopTracks = async () => {
  const token = await getAccessToken();

  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { items } = await response.json();

  return items;
};
