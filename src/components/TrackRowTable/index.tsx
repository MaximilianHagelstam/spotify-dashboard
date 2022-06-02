import Link from "next/link";
import { ReactNode } from "react";

interface TrackRowTableProps {
  title: string;
  href: string;
  children: ReactNode;
}

const TrackRowTable = ({ title, href, children }: TrackRowTableProps) => {
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

      <div>
        <div className="flex-col flex">{children}</div>
      </div>
    </div>
  );
};

export default TrackRowTable;
