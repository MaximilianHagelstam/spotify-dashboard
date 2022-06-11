import type { NextPage } from "next";
import useSWR from "swr";
import CardRow from "../components/CardRow";
import ErrorPage from "../components/ErrorPage";
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

  if (trackError !== undefined || artistError !== undefined)
    return <ErrorPage />;

  return (
    <Layout>
      <CardRow
        title="Top tracks this month"
        href="/top-tracks"
        tracks={trackData}
        isLoading={trackLoading}
      />

      <CardRow
        title="Top artists this month"
        href="/top-artists"
        artists={artistData}
        isLoading={artistLoading}
      />
    </Layout>
  );
};

export default Dashboard;
