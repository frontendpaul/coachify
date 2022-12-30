const Logo = () => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <img
        className="w-7 md:w-auto"
        src="/coachify-logo.svg"
        alt="coachify logo"
      />
      <span className="text-xl md:text-2xl font-semibold tracking-wide">
        Coachify
      </span>
    </div>
  );
};
export default Logo;
