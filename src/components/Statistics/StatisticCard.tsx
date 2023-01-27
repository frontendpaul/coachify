import { AiFillStar } from 'react-icons/ai';

type Props = {
  statistic: string;
  title: string;
  isRating?: boolean;
};

const StatisticCard = ({ statistic, title, isRating = false }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 p-4 md:p-6 xl:px-14 xl:max-w-max rounded-xl bg-coachify-teal-1000 text-center">
      <div className="flex items-center gap-1 text-2xl md:text-3xl tracking-wide leading-none text-coachify-teal-400">
        <h3 className=" font-bold ">{statistic}</h3>
        {isRating && <AiFillStar />}
      </div>
      <p className="text-sm md:text-xl xl:whitespace-nowrap">{title}</p>
    </div>
  );
};
export default StatisticCard;
