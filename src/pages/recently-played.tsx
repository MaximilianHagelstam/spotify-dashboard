import type { NextPage } from "next";
import useSWR from "swr";
import CardGrid from "../components/CardGrid";
import ErrorPage from "../components/ErrorPage";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import Track from "../interfaces/Track";
import Layout from "../layout";

const RecentlyPlayed: NextPage = () => {
  const { fetcher } = useAuth();

  const { data, error, isValidating } = useSWR<{ track: Track }[]>(
    "https://api.spotify.com/v1/me/player/recently-played?limit=50",
    fetcher
  );

  const recentTracks = data?.map((item) => item.track);

  if (error !== undefined) return <ErrorPage />;

  return (
    <Layout>
      {data && <CardGrid tracks={recentTracks} />}

      {isValidating && <Spinner />}
    </Layout>
  );
};

export default RecentlyPlayed;
