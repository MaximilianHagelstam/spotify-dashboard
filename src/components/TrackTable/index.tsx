import Link from "next/link";
import Track from "../../interfaces/Track";
import LoadingTrackRow from "./LoadingTrackRow";
import TrackRow from "./TrackRow";

interface TrackRowTableProps {
  title: string;
  href: string;
  tracks: Track[];
  loading: boolean;
}

const TrackTable = ({ title, href, tracks, loading }: TrackRowTableProps) => {
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

      <div className="flex-col flex">
        {loading ? (
          <>
            {Array(10)
              .fill(1)
              .map((_, idx) => (
                <LoadingTrackRow key={idx} />
              ))}
          </>
        ) : (
          <>
            {tracks.map((track, idx) => (
              <TrackRow key={idx} ranking={idx + 1} track={track} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TrackTable;
