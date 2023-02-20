import { toPercent } from 'utils/helpers';

type Props = {
  total: number;
  rating: number;
  index: number;
};
const RatingBar = ({ total, rating, index }: Props) => {
  const percent = toPercent(total, rating);

  return (
    <li className="flex items-center gap-3 md:gap-4">
      <span>{index + 1}</span>
      <div className="relative h-2 flex-1 rounded-sm bg-coachify-teal-1100/75">
        <div
          className="absolute inset-0 right-auto rounded-sm bg-coachify-teal-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="block w-8 text-right">{Math.round(percent)} %</span>
    </li>
  );
};
export default RatingBar;
