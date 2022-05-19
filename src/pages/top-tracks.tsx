import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import TrackCard from "../components/TrackCard";
import useAuth from "../hooks/useAuth";
import Track from "../interfaces/Track";
import Layout from "../layout";
import { getTopTracks } from "../lib/api";

const TopTracks: NextPage = () => {
  const LOAD_MORE_LIMIT = 8;

  const { token } = useAuth();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const topTracks = await getTopTracks(
          token,
          "short_term",
          LOAD_MORE_LIMIT,
          offset
        );

        if (topTracks.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }

        setTracks([...tracks, ...topTracks]);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };

    fetchTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  if (error) return <ErrorPage />;

  return (
    <Layout>
      {tracks && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-8">
          {tracks.map((track, idx) => (
            <TrackCard key={track.id} track={track} ranking={idx + 1} />
          ))}
        </div>
      )}

      {loading && <Loading />}

      {hasMore && (
        <div className="grid place-items-center">
          <button
            onClick={() => {
              setOffset(offset + LOAD_MORE_LIMIT);
            }}
            disabled={loading}
            className="bg-white text-black font-bold py-2 px-6 rounded-full mb-8 hover:scale-105"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </Layout>
  );
};

export default TopTracks;
