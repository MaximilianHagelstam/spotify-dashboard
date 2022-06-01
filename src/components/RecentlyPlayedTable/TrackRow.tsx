import Image from "next/image";
import Link from "next/link";
import React from "react";
import Track from "../../interfaces/Track";
import msToTime from "../../lib/msToTime";

interface TrackRowProps {
  track: Track;
  ranking: number;
}

const TrackRow = ({ track, ranking }: TrackRowProps) => {
  return (
    <Link href={track.external_urls.spotify} passHref>
      <div className="flex bg-gray-accent hover:bg-gray-hover py-2 mb-2 rounded-xl">
        <div className="text-gray-text hidden lg:block mt-auto mb-auto mx-8">
          {ranking}
        </div>
        <div className="w-12/12 lg:w-7/12 truncate">
          <div className="w-full flex items-start truncate overflow-hidden">
            <div className="w-12 h-12 ml-2 lg:ml-0 overflow-hidden rounded-full">
              <Image
                src={track.album.images[0].url}
                width={48}
                height={48}
                alt="track"
              />
            </div>
            <div className="ml-4 truncate mt-auto mb-auto">
              <h4 className="truncate mr-4">{track.name}</h4>
              <h3 className="text-sm text-gray-text truncate">
                {track.artists[0].name}
              </h3>
            </div>
          </div>
        </div>
        <div className="text-gray-text hidden lg:block w-4/12 text-left truncate mt-auto mb-auto">
          {track.album.name}
        </div>
        <div className="text-gray-text hidden lg:block text-left mx-8 mt-auto mb-auto">
          {msToTime(track.duration_ms)}
        </div>
      </div>
    </Link>
  );
};

export default TrackRow;
