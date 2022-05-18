import type { NextPage } from "next";
import useSWR from "swr";
import TrackCard from "../components/TrackCard";
import useAuth from "../hooks/useAuth";
import Track from "../interfaces/Track";
import Layout from "../layout";

const Home: NextPage = () => {
  const { fetcher } = useAuth();

  const { data, isValidating } = useSWR<{ items: Track[] }>(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
    fetcher
  );

  if (isValidating) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 pb-8">
        {data?.items.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
