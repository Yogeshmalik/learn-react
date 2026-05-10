const Shimmer = () => {
  return (
    <div className="shimmer-card-container flex flex-wrap gap-4 py-2 w-full animate-pulse">
      {Array(8)
        .fill("")
        .map((e, index) => {
          return <p key={index} className="shimmer-card h-32 w-38 md:h-44 md:w-52 bg-gray-300" />
        })}
    </div>
  );
};

export default Shimmer;
