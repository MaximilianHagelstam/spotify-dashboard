import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import TrackCard from "../components/TrackCard";
import useAuth from "../hooks/useAuth";
import Track from "../interfaces/Track";
import Layout from "../layout";
import { getTopTracks } from "../lib/api";
import classNames from "../lib/classNames";

const TopTracks: NextPage = () => {
  const LOAD_MORE_LIMIT = 8;

  const { token } = useAuth();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [timeRange, setTimeRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    try {
      setLoading(true);
      const newOffset = offset + LOAD_MORE_LIMIT;

      const newTracks = await getTopTracks(
        token,
        timeRange,
        LOAD_MORE_LIMIT,
        newOffset
      );

      setOffset(newOffset);

      if (newTracks.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setTracks([...tracks, ...newTracks]);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const topTracks = await getTopTracks(
          token,
          timeRange,
          LOAD_MORE_LIMIT,
          0
        );

        setOffset(0);
        setHasMore(true);
        setTracks(topTracks);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };

    fetchTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  if (error) return <ErrorPage />;

  return (
    <Layout>
      <div>
        <button
          disabled={loading}
          onClick={() => {
            setTimeRange("short_term");
          }}
          className={classNames(
            timeRange === "short_term" ? "bg-white text-black" : "text-white",
            "border-white border-2 font-bold py-2 px-6 rounded-full mb-8 hover:bg-white hover:text-black"
          )}
        >
          Short Term
        </button>
        <button
          disabled={loading}
          onClick={() => {
            setTimeRange("medium_term");
          }}
          className={classNames(
            timeRange === "medium_term" ? "bg-white text-black" : "text-white",
            "border-white border-2 font-bold py-2 px-6 rounded-full mb-8 hover:bg-white hover:text-black ml-4"
          )}
        >
          Medium Term
        </button>
        <button
          disabled={loading}
          onClick={() => {
            setTimeRange("long_term");
          }}
          className={classNames(
            timeRange === "long_term" ? "bg-white text-black" : "text-white",
            "border-white border-2 font-bold py-2 px-6 rounded-full mb-8 hover:bg-white hover:text-black ml-4"
          )}
        >
          Long Term
        </button>

        <span className="text-grey-text text-lg flex justify-center mb-4 md:ml-8 md:mb-0 md:inline">
          {timeRange === "short_term"
            ? "Last 4 weeks"
            : timeRange === "medium_term"
            ? "Last 6 months"
            : timeRange === "long_term"
            ? "Last several years"
            : ""}
        </span>
      </div>

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
            onClick={() => loadMore()}
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
