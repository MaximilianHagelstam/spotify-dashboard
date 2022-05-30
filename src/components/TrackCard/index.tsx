import Image from "next/image";
import { useState } from "react";
import Track from "../../interfaces/Track";
import classNames from "../../lib/classNames";

interface TrackCardProps {
  track: Track;
  ranking: number;
}

const TrackCard = ({ track, ranking }: TrackCardProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <a
      href={track.external_urls.spotify}
      className="bg-gray-accent hover:bg-gray-hover px-4 py-4 rounded-xl"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          alt={track.name}
          src={track.album.images[0].url}
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
        {track.artists.map((artist) => artist.name).join(", ")}
      </h3>
      <p className="mt-1 text-lg">
        {ranking}. {track.name}
      </p>
    </a>
  );
};

export default TrackCard;
