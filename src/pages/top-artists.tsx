import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import Artist from "../interfaces/Artist";
import Layout from "../layout";
import { getTopArtists } from "../lib/api";

const TopArtists: NextPage = () => {
  const LOAD_MORE_LIMIT = 8;

  const { token } = useAuth();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const topArtists = await getTopArtists(
          token,
          "short_term",
          LOAD_MORE_LIMIT,
          offset
        );

        if (topArtists.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }

        setArtists([...artists, ...topArtists]);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };

    fetchArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  if (error) return <ErrorPage />;

  return (
    <Layout>
      {artists && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-8">
          {artists.map((artist, idx) => (
            <ArtistCard key={artist.id} artist={artist} ranking={idx + 1} />
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

export default TopArtists;
