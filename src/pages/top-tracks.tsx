import type { NextPage } from "next";
import { useState } from "react";
import CardGrid from "../components/CardGrid";
import ErrorPage from "../components/ErrorPage";
import LoadMoreButton from "../components/LoadMoreButton";
import Spinner from "../components/Spinner";
import TimeRangeSelector from "../components/TimeRangeSelector";
import usePagination from "../hooks/usePagination";
import TimeRange from "../interfaces/TimeRange";
import Track from "../interfaces/Track";
import Layout from "../layout";

const TopTracks: NextPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const {
    data: tracks,
    isError,
    isLoading,
    size,
    setSize,
    isReachedEnd,
  } = usePagination<Track>(
    "https://api.spotify.com/v1/me/top/tracks",
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

      {tracks && <CardGrid tracks={tracks} />}

      {isLoading && <Spinner />}

      {!isReachedEnd && !isLoading && (
        <LoadMoreButton onClick={() => setSize(size + 1)} />
      )}
    </Layout>
  );
};

export default TopTracks;
