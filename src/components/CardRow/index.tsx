import Link from "next/link";
import { ReactNode } from "react";

interface CardRowProps {
  title: string;
  href: string;
  children: ReactNode;
}

const CardRow = ({ title, href, children }: CardRowProps) => {
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

      <div className="grid grid-cols-5 grid-flow-row gap-x-4">{children}</div>
    </div>
  );
};

export default CardRow;
