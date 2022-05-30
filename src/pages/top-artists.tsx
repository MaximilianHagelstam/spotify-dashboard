import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import Artist from "../interfaces/Artist";
import Layout from "../layout";
import { getTopArtists } from "../lib/api";
import classNames from "../lib/classNames";

const TopArtists: NextPage = () => {
  const LOAD_MORE_LIMIT = 8;

  const { token } = useAuth();
  const [artists, setArtists] = useState<Artist[]>([]);
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

      const newArtists = await getTopArtists(
        token,
        timeRange,
        LOAD_MORE_LIMIT,
        newOffset
      );

      setOffset(newOffset);

      if (newArtists.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setArtists([...artists, ...newArtists]);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const topArtists = await getTopArtists(
          token,
          timeRange,
          LOAD_MORE_LIMIT,
          0
        );

        setOffset(0);
        setHasMore(true);
        setArtists(topArtists);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };

    fetchArtists();
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
          Short
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
          Medium
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
          Long
        </button>

        <span className="text-gray-text text-lg flex justify-center mb-4 md:ml-8 md:mb-0 md:inline">
          {timeRange === "short_term"
            ? "Last 4 weeks"
            : timeRange === "medium_term"
            ? "Last 6 months"
            : timeRange === "long_term"
            ? "Last several years"
            : ""}
        </span>
      </div>

      {artists && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-8">
          {artists.map((artist, idx) => (
            <Card key={artist.id} artist={artist} ranking={idx + 1} />
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

export default TopArtists;
