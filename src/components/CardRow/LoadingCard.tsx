const LoadingCard = () => {
  return (
    <a className="bg-gray-accent px-4 py-4 rounded-lg flex-none w-1/2 md:w-1/4 lg:w-1/5">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-lg">
        <div className="bg-[#8b8b8b] h-full absolute animate-pulse" />
      </div>

      <div className="bg-white mt-4 w-2/3 h-5 animate-pulse truncate rounded-sm" />

      <div className="bg-gray-text mt-2 w-1/3 h-3 animate-pulse truncate rounded-sm" />
    </a>
  );
};

export default LoadingCard;
