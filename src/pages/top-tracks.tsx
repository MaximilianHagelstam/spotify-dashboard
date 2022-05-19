import type { NextPage } from "next";
import useSWR from "swr";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import TrackCard from "../components/TrackCard";
import useAuth from "../hooks/useAuth";
import Track from "../interfaces/Track";
import Layout from "../layout";

const TopTracks: NextPage = () => {
  const { fetcher } = useAuth();

  const { data, isValidating, error } = useSWR<{
    items: Track[];
  }>(
    `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50`,
    fetcher
  );

  if (error) return <ErrorPage />;

  return (
    <Layout>
      {data && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {data.items.map((track, idx) => (
            <TrackCard key={track.id} track={track} ranking={idx + 1} />
          ))}
        </div>
      )}

      {isValidating && <Loading />}

      <div className="grid place-items-center">
        <button
          disabled={!isValidating}
          className="bg-white text-black font-bold py-2 px-6 rounded-full my-8 hover:scale-105"
        >
          {isValidating ? "Loading..." : "Load More"}
        </button>
      </div>
    </Layout>
  );
};

export default TopTracks;
