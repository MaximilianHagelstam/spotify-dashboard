import Link from "next/link";
import Artist from "../../interfaces/Artist";
import Track from "../../interfaces/Track";
import Card from "../Card";
import LoadingCard from "./LoadingCard";

interface CardRowProps {
  title: string;
  href: string;
  tracks?: Track[];
  artists?: Artist[];
  loading: boolean;
}

const CardRow = ({ title, href, tracks, artists, loading }: CardRowProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold hover:underline">
          <Link href={href}>{title}</Link>
        </div>

        <div className="text-gray-text hover:underline">
          <Link href={href}>See more</Link>
        </div>
      </div>

      <div className="flex flex-no-wrap space-x-4 overflow-x-auto scrolling-touch items-start lg:pr-16 lg:overflow-x-hidden">
        {loading ? (
          <>
            {Array(5)
              .fill(1)
              .map((_, idx) => (
                <LoadingCard key={idx} />
              ))}
          </>
        ) : (
          <>
            {tracks?.map((track, idx) => (
              <Card key={track.id} ranking={idx + 1} track={track} scrollable />
            )) ??
              artists?.map((artist, idx) => (
                <Card
                  key={artist.id}
                  ranking={idx + 1}
                  artist={artist}
                  scrollable
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CardRow;
