import type { NextPage } from "next";
import { useState } from "react";
import Card from "../components/Card";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import TimeRangeSelector from "../components/TimeRangeSelector";
import usePagination from "../hooks/usePagination";
import Artist from "../interfaces/Artist";
import TimeRange from "../interfaces/TimeRange";
import Layout from "../layout";

const TopArtists: NextPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const {
    data: artists,
    isError,
    isLoading,
    size,
    setSize,
    isReachedEnd,
  } = usePagination<Artist>(
    "https://api.spotify.com/v1/me/top/artists",
    8,
    timeRange
  );

  if (isError) return <ErrorPage />;

  return (
    <Layout>
      <TimeRangeSelector
        currentTimeRange={timeRange}
        handleTimeRange={setTimeRange}
      />

      {artists && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-8">
          {artists.map((artist, idx) => (
            <Card key={artist.id} artist={artist} ranking={idx + 1} />
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

export default TopArtists;
