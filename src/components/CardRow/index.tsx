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
      <div className="flex justify-between items-center mb-4 px-2 sm:px-4 lg:px-0">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-gray-text hover:text-white">
          <Link href={href}>See more</Link>
        </div>
      </div>
      <div className="grid grid-cols-5-overflow lg:grid-cols-5 grid-flow-row gap-x-2 sm:gap-x-4 overflow-x-scroll md:overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default CardRow;
