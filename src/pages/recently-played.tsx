import type { NextPage } from "next";
import useSWR from "swr";
import Card from "../components/Card";
import CardGrid from "../components/CardGrid";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import Track from "../interfaces/Track";
import Layout from "../layout";

const RecentlyPlayed: NextPage = () => {
  const { fetcher } = useAuth();

  const { data, error, isValidating } = useSWR<{ track: Track }[]>(
    "https://api.spotify.com/v1/me/player/recently-played?limit=50",
    fetcher
  );

  if (error !== undefined) return <ErrorPage />;

  return (
    <Layout>
      {data && (
        <CardGrid>
          {data.map((item, idx) => (
            <Card key={idx} track={item.track} ranking={idx + 1} />
          ))}
        </CardGrid>
      )}

      {isValidating && <Loading />}
    </Layout>
  );
};
export default RecentlyPlayed;
