import { ReactNode } from "react";

interface CardGridProps {
  children: ReactNode;
}

const CardGrid = ({ children }: CardGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-8">
      {children}
    </div>
  );
};

export default CardGrid;
