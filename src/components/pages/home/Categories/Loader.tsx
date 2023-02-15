const Loader = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
        <LoaderCard key={index} />
      ))}
    </>
  );
};

const LoaderCard = () => {
  return (
    <li className="aspect-square overflow-hidden rounded-xl bg-coachify-teal-1100 p-4">
      <div className="flex h-full animate-pulse">
        <div className="my-1 mt-auto h-4 w-32 rounded-full bg-white/5"></div>
      </div>
    </li>
  );
};

export default Loader;
