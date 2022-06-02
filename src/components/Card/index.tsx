import Image from "next/image";
import { useState } from "react";
import Artist from "../../interfaces/Artist";
import Track from "../../interfaces/Track";
import classNames from "../../lib/classNames";

interface CardProps {
  track?: Track;
  artist?: Artist;
  ranking: number;
}

const Card = ({ track, artist, ranking }: CardProps) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  return (
    <a
      href={track?.external_urls.spotify ?? artist?.external_urls.spotify}
      className="bg-gray-accent hover:bg-gray-hover px-4 py-4 rounded-lg"
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
