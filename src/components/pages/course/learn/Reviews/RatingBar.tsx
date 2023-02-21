import { useEffect, useRef } from 'react';
import { toPercent } from 'utils/helpers';

type Props = {
  total: number;
  rating: number;
  index: number;
  percentWidth: number;
  setPercentWidth: any;
};
const RatingBar = ({
  total,
  rating,
  index,
  percentWidth,
  setPercentWidth,
}: Props) => {
  const percent = toPercent(total, rating);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollWidth > percentWidth &&
        setPercentWidth(ref.current.scrollWidth);
    }
  }, [ref, percentWidth, setPercentWidth]);

  return (
    <li className="flex items-center gap-3 md:gap-4">
      <span>{index + 1}</span>
      <div className="relative h-2 flex-1 rounded-sm bg-coachify-teal-1100/75">
        <div
          className="absolute inset-0 right-auto rounded-sm bg-coachify-teal-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span
        ref={ref}
        className="block w-[var(--percent-width)] whitespace-nowrap text-right"
      >
        {Math.round(percent)} %
      </span>
    </li>
  );
};
export default RatingBar;
