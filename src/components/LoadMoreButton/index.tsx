import { ButtonHTMLAttributes } from "react";

const LoadMoreButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="grid place-items-center">
      <button
        {...props}
        className="bg-white text-black font-bold py-2 px-6 rounded-full mb-8 hover:scale-105"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;
