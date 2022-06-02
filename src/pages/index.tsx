import type { NextPage } from "next";
import useSWR from "swr";
import Card from "../components/Card";
import CardRow from "../components/CardRow";
import ErrorPage from "../components/ErrorPage";
import LoadingCard from "../components/LoadingCard";
import LoadingTrackRow from "../components/LoadingTrackRow";
import TrackRow from "../components/TrackRow";
import TrackRowTable from "../components/TrackRowTable";
import useAuth from "../hooks/useAuth";
import Artist from "../interfaces/Artist";
import Track from "../interfaces/Track";
import Layout from "../layout";

const Dashboard: NextPage = () => {
  const { fetcher } = useAuth();

  const {
    data: trackData,
    error: trackError,
    isValidating: trackLoading,
  } = useSWR<Track[]>(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    fetcher
  );

  const {
    data: artistData,
    error: artistError,
    isValidating: artistLoading,
  } = useSWR<Artist[]>(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5",
    fetcher
  );

  const {
    data: recentData,
    error: recentError,
    isValidating: recentLoading,
  } = useSWR<{ track: Track }[]>(
    "https://api.spotify.com/v1/me/player/recently-played?limit=10",
    fetcher
  );

  if (
    trackError !== undefined ||
    artistError !== undefined ||
    recentError !== undefined
  )
    return <ErrorPage />;

  return (
    <Layout>
      <CardRow title="Top Tracks" href="/top-tracks">
        {trackLoading ? (
          <>
            {Array(5)
              .fill(1)
              .map((_, idx) => (
                <LoadingCard key={idx} />
              ))}
          </>
        ) : (
          <>
            {trackData?.map((track, idx) => (
              <Card key={track.id} ranking={idx + 1} track={track} scrollable />
            ))}
          </>
        )}
      </CardRow>

      <CardRow title="Top Artists" href="/top-artists">
        {artistLoading ? (
          <>
            {Array(5)
              .fill(1)
              .map((_, idx) => (
                <LoadingCard key={idx} />
              ))}
          </>
        ) : (
          <>
            {artistData?.map((artist, idx) => (
              <Card
                key={artist.id}
                ranking={idx + 1}
                artist={artist}
                scrollable
              />
            ))}
          </>
        )}
      </CardRow>

      <TrackRowTable title="Recently Played" href="/recently-played">
        {recentLoading ? (
          <>
            {Array(10)
              .fill(1)
              .map((_, idx) => (
                <LoadingTrackRow key={idx} />
              ))}
          </>
        ) : (
          <>
            {recentData?.map((item, idx) => (
              <TrackRow key={idx} ranking={idx + 1} track={item.track} />
            ))}
          </>
        )}
      </TrackRowTable>
    </Layout>
  );
};

export default Dashboard;
