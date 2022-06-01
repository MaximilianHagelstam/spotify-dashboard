import type { NextPage } from "next";
import useSWR from "swr";
import Card from "../components/Card";
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
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-8">
          {data.map((item, idx) => (
            <Card key={item.track.id} track={item.track} ranking={idx + 1} />
          ))}
        </div>
      )}

      {isValidating && <Loading />}
    </Layout>
  );
};
export default RecentlyPlayed;
