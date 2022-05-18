import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import LogoutButton from "../components/LogoutButton";
import TrackCard from "../components/TrackCard";
import useAuth from "../hooks/useAuth";
import Track from "../interfaces/Track";

const Home: NextPage = () => {
  const router = useRouter();
  const { isAuth, fetcher } = useAuth();

  const { data, isValidating } = useSWR<{ items: Track[] }>(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
    fetcher
  );

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [router, isAuth]);

  if (isValidating) return <p>Loading...</p>;

  return (
    <>
      <LogoutButton />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 pb-8">
        {data?.items.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </>
  );
};

export default Home;
