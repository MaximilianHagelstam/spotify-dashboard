import Image from "next/image";
import Track from "../interfaces/Track";

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        height={track.album.images[0].height}
        width={track.album.images[0].width}
        src={track.album.images[0].url}
        alt="Cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{track.name}</div>
      </div>
      <div className="px-6 pb-2">
        {track.artists.map((artist) => (
          <span
            key={artist.id}
            className="inline-block bg-accent rounded-full px-3 py-1 text-sm mr-2 mb-2"
          >
            {artist.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrackCard;
