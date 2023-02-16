type Props = {
  percentage: number;
  index: number;
};
const RatingBar = ({ percentage, index }: Props) => {
  return (
    <li className="flex items-center gap-3 md:gap-4">
      <span>{index + 1}</span>
      <div className="relative h-2 flex-1 rounded-sm bg-coachify-teal-1100/75">
        <div
          className="absolute inset-0 right-auto rounded-sm bg-coachify-teal-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="block w-8 text-right">{Math.round(percentage)} %</span>
    </li>
  );
};
export default RatingBar;
