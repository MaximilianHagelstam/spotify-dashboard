import type { NextPage } from "next";
import { useState } from "react";
import Card from "../components/Card";
import CardGrid from "../components/CardGrid";
import ErrorPage from "../components/ErrorPage";
import LoadMoreButton from "../components/LoadMoreButton";
import Spinner from "../components/Spinner";
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
        <CardGrid>
          {artists.map((artist, idx) => (
            <Card key={artist.id} artist={artist} ranking={idx + 1} />
          ))}
        </CardGrid>
      )}

      {isLoading && <Spinner />}

      {!isReachedEnd && !isLoading && (
        <LoadMoreButton onClick={() => setSize(size + 1)}>
          Load More
        </LoadMoreButton>
      )}
    </Layout>
  );
};

export default TopArtists;
