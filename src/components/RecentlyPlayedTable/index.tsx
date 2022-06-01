import Link from "next/link";
import Track from "../../interfaces/Track";
import TrackRow from "./TrackRow";

interface RecentlyPlayedTableProps {
  title: string;
  href: string;
  tracks: Track[];
}
const RecentlyPlayedTable = ({
  title,
  href,
  tracks,
}: RecentlyPlayedTableProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold hover:underline">
          <Link href={href}>{title}</Link>
        </div>
      </div>
      <div>
        <div className="flex-col flex">
          {tracks.map((track, idx) => (
            <TrackRow key={track.id} track={track} ranking={idx + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyPlayedTable;
