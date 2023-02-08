const Loader = () => {
  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <LoaderCard key={index} />
      ))}
    </>
  );
};

const LoaderCard = () => {
  return (
    <li className="flex aspect-video overflow-hidden rounded-xl bg-coachify-teal-1100 p-4">
      <div className="mt-auto w-full animate-pulse">
        <div className="flex flex-1 flex-col pt-3">
          <div className="mb-3 mt-1 h-4 rounded-full bg-white/5"></div>
          <div className="mb-3 h-[14px] w-32 rounded-full bg-white/5"></div>
          <div className="my-1 h-3 w-52 rounded-full bg-white/5"></div>
        </div>
      </div>
    </li>
  );
};

export default Loader;
