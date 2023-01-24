import { ButtonHTMLAttributes } from "react";

const LoadMoreButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="grid place-items-center">
      <button
        {...props}
        className="mb-8 rounded-full bg-white py-2 px-6 font-bold text-black hover:scale-105"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;
