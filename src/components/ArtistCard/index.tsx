import Image from "next/image";
import { useState } from "react";
import Artist from "../../interfaces/Artist";
import classNames from "../../lib/classNames";

interface ArtistCardProps {
  artist: Artist;
  ranking: number;
}

const ArtistCard = ({ artist, ranking }: ArtistCardProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <a
      href={artist.external_urls.spotify}
      className="bg-gray-accent hover:bg-gray-hover px-4 py-4 rounded-xl"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          alt={artist.name}
          src={artist.images[0].url}
          layout="fill"
          objectFit="cover"
          className={classNames(
            "duration-700 ease-in-out",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>

      <h3 className="mt-4 text-sm text-gray-text">
        {artist.genres.slice(0, 3).join(", ")}
      </h3>
      <p className="mt-1 text-lg">
        {ranking}. {artist.name}
      </p>
    </a>
  );
};

export default ArtistCard;
