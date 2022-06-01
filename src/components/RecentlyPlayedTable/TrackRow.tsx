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
            <Link href={track.external_urls.spotify} passHref>
              <h4 className="truncate mr-4 hover:underline hover:cursor-pointer">
                {track.name}
              </h4>
            </Link>
            <Link href={track.artists[0].external_urls.spotify} passHref>
              <h3 className="text-sm text-gray-text truncate hover:underline hover:cursor-pointer">
                {track.artists[0].name}
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <Link href={track.album.external_urls.spotify} passHref>
        <div className="text-gray-text hidden lg:block w-4/12 text-left truncate mt-auto mb-auto hover:underline hover:cursor-pointer">
          {track.album.name}
        </div>
      </Link>
      <div className="text-gray-text hidden lg:block text-left mx-8 mt-auto mb-auto">
        {msToTime(track.duration_ms)}
      </div>
    </div>
  );
};

export default TrackRow;
