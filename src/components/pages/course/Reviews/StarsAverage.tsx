import Image from 'next/image';

const StarsAverage = ({ rating }: { rating: number }) => {
  const border = 1;
  const inner = 18;
  const space = 4;
  const fullNumber = Math.floor(rating);
  const fraction = rating - fullNumber;
  const width =
    (border * 2 + inner + space) * fullNumber + fraction * inner + border;

  console.log(width);

  return (
    <div className="relative">
      <Image src="/stars.svg" width={116} height={20} alt="" />
      <div
        className="absolute top-0 left-0 h-5 bg-white"
        style={{
          mask: 'url(/stars-full.svg)',
          WebkitMask: 'url(/stars-full.svg)',
          width: `${width}px`,
        }}
      ></div>
    </div>
  );
};
export default StarsAverage;
