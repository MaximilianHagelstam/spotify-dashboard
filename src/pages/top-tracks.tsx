import type { NextPage } from "next";
import Card from "../components/Card";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import usePagination from "../hooks/usePagination";
import Track from "../interfaces/Track";
import Layout from "../layout";

const TopTracks: NextPage = () => {
  const LOAD_MORE_LIMIT = 8;

  const {
    data: tracks,
    isError,
    isLoading,
    size,
    setSize,
    isReachedEnd,
  } = usePagination<Track>(
    "https://api.spotify.com/v1/me/top/tracks",
    LOAD_MORE_LIMIT,
    "short_term"
  );

  if (isError) return <ErrorPage />;

  return (
    <Layout>
      {tracks && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-8">
          {tracks.map((track, idx) => (
            <Card key={track.id} track={track} ranking={idx + 1} />
          ))}
        </div>
      )}

      {isLoading && <Loading />}

      {!isReachedEnd && !isLoading && (
        <div className="grid place-items-center">
          <button
            onClick={() => setSize(size + 1)}
            disabled={isLoading}
            className="bg-white text-black font-bold py-2 px-6 rounded-full mb-8 hover:scale-105"
          >
            Load More
          </button>
        </div>
      )}
    </Layout>
  );
};

export default TopTracks;
