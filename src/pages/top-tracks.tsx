import type { NextPage } from "next";
import { useState } from "react";
import Card from "../components/Card";
import CardGrid from "../components/CardGrid";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import LoadMoreButton from "../components/LoadMoreButton";
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

      {tracks && (
        <CardGrid>
          {tracks.map((track, idx) => (
            <Card key={track.id} track={track} ranking={idx + 1} />
          ))}
        </CardGrid>
      )}

      {isLoading && <Loading />}

      {!isReachedEnd && !isLoading && (
        <LoadMoreButton onClick={() => setSize(size + 1)}>
          Load More
        </LoadMoreButton>
      )}
    </Layout>
  );
};

export default TopTracks;
