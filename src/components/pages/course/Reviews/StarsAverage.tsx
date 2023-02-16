import Image from 'next/image';

const StarsAverage = ({ rating }: { rating: number }) => {
  const width = (rating / 5) * 100 + '%';
  return (
    <div className="relative">
      <Image src="/stars.svg" width={108} height={20} alt="" />
      <div
        className="absolute top-0 left-0 h-5 bg-white"
        style={{
          mask: 'url(/stars-full.svg)',
          WebkitMask: 'url(/stars-full.svg)',
          width: width,
        }}
      ></div>
    </div>
  );
};
export default StarsAverage;
