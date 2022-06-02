import type { NextPage } from "next";
import useSWR from "swr";
import CardRow from "../components/CardRow";
import ErrorPage from "../components/ErrorPage";
import TrackRowTable from "../components/TrackTable";
import useAuth from "../hooks/useAuth";
import Artist from "../interfaces/Artist";
import Track from "../interfaces/Track";
import Layout from "../layout";

const Dashboard: NextPage = () => {
  const { fetcher } = useAuth();

  const {
    data: trackData,
    error: trackError,
    isValidating: trackLoading,
  } = useSWR<Track[]>(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    fetcher
  );

  const {
    data: artistData,
    error: artistError,
    isValidating: artistLoading,
  } = useSWR<Artist[]>(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5",
    fetcher
  );

  const {
    data: recentData,
    error: recentError,
    isValidating: recentLoading,
  } = useSWR<{ track: Track }[]>(
    "https://api.spotify.com/v1/me/player/recently-played?limit=10",
    fetcher
  );

  const recentTracks = recentData?.map((item) => item.track) ?? [];

  if (
    trackError !== undefined ||
    artistError !== undefined ||
    recentError !== undefined
  )
    return <ErrorPage />;

  return (
    <Layout>
      <CardRow
        title="Top Tracks"
        href="/top-tracks"
        tracks={trackData}
        isLoading={trackLoading}
      />

      <CardRow
        title="Top Artists"
        href="/top-artists"
        artists={artistData}
        isLoading={artistLoading}
      />

      <TrackRowTable
        title="Recently Played"
        href="/recently-played"
        tracks={recentTracks}
        isLoading={recentLoading}
      />
    </Layout>
  );
};

export default Dashboard;
