import type { NextPage } from "next";
import useSWR from "swr";
import ArtistCard from "../components/ArtistCard";
import useAuth from "../hooks/useAuth";
import Artist from "../interfaces/Artist";
import Layout from "../layout";

const TopArtists: NextPage = () => {
  const { fetcher } = useAuth();

  const { data, isValidating } = useSWR<{
    items: Artist[];
  }>(
    `https://api.spotify.com/v1/me/top/artists?time_range=short_term`,
    fetcher
  );

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {data?.items.map((artist, idx) => (
          <ArtistCard key={artist.id} artist={artist} ranking={idx + 1} />
        ))}
      </div>

      <div className="grid place-items-center">
        <button
          disabled={isValidating}
          className="bg-white text-black font-bold py-2 px-6 rounded-full my-8 hover:scale-105"
        >
          {isValidating ? "Loading..." : "Load More"}
        </button>
      </div>
    </Layout>
  );
};

export default TopArtists;
