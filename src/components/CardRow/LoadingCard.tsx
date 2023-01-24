const LoadingCard = () => {
  return (
    <a className="w-1/2 flex-none rounded-lg bg-gray-accent px-4 py-4 md:w-1/4 lg:w-1/5">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-lg">
        <div className="absolute h-full animate-pulse bg-[#8b8b8b]" />
      </div>
      <div className="mt-4 h-5 w-2/3 animate-pulse truncate rounded-sm bg-white" />
      <div className="mt-2 h-3 w-1/3 animate-pulse truncate rounded-sm bg-gray-text" />
    </a>
  );
};

export default LoadingCard;
