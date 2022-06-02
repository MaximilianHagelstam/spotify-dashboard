import Artist from "../../interfaces/Artist";
import Track from "../../interfaces/Track";
import Card from "../Card";

interface CardGridProps {
  tracks?: Track[];
  artists?: Artist[];
}

const CardGrid = ({ tracks, artists }: CardGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-8">
      <>
        {tracks?.map((track, idx) => (
          <Card key={`${idx}-track`} ranking={idx + 1} track={track} />
        )) ??
          artists?.map((artist, idx) => (
            <Card key={`${idx}-artist`} ranking={idx + 1} artist={artist} />
          ))}
      </>
    </div>
  );
};

export default CardGrid;
