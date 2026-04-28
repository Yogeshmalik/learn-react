const Shimmer = () => {
  return (
    <div className="shimmer-card-container">
      {Array(8)
        .fill("")
        .map((e, index) => {
          return <p key={index} className="shimmer-card" />
        })}
    </div>
  );
};

export default Shimmer;
