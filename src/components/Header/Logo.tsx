import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div className="relative w-7 md:w-8 aspect-square">
        <Image src="/coachify-logo.svg" alt="coachify logo" fill />
      </div>
      <span className="text-xl md:text-2xl font-semibold tracking-wide">
        Coachify
      </span>
    </div>
  );
};
export default Logo;
