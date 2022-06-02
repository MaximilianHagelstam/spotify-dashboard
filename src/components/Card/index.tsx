import Image from "next/image";
import { useState } from "react";
import Artist from "../../interfaces/Artist";
import Track from "../../interfaces/Track";
import classNames from "../../lib/classNames";

interface CardProps {
  track?: Track;
  artist?: Artist;
  ranking: number;
  scrollable?: boolean;
  loading?: boolean;
}

const Card = ({
  track,
  artist,
  ranking,
  scrollable = false,
  loading = false,
}: CardProps) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  if (loading)
    return (
      <a
        className={`bg-gray-accent px-4 py-4 rounded-lg ${
          scrollable && "flex-none w-1/2 md:w-1/4 lg:w-1/5"
        }`}
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-lg">
          <div className="bg-[#8b8b8b] h-full absolute animate-pulse" />
        </div>

        <div className="bg-white mt-4 w-2/3 h-5 animate-pulse truncate rounded-sm" />

        <div className="bg-gray-text mt-2 w-1/3 h-3 animate-pulse truncate rounded-sm" />
      </a>
    );

  return (
    <a
      href={track?.external_urls.spotify ?? artist?.external_urls.spotify}
      className={`bg-gray-accent hover:bg-gray-hover px-4 py-4 rounded-lg ${
        scrollable && "flex-none w-1/2 md:w-1/4 lg:w-1/5"
      }`}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          alt="Cover"
          src={
            track?.album.images[0].url ??
            artist?.images[0].url ??
            "/placeholder.png"
          }
          layout="fill"
          objectFit="cover"
          className={classNames(
            "duration-700 ease-in-out",
            imageIsLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setImageIsLoading(false)}
        />
      </div>

      <p className="mt-4 text-lg truncate">
        {ranking}. {track?.name ?? artist?.name}
      </p>

      <h3 className="mt-1 text-gray-text truncate">
        {track?.artists.map((trackArtist) => trackArtist.name).join(", ") ??
          artist?.genres[0]}
      </h3>
    </a>
  );
};

export default Card;
