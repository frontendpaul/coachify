import { FiStar } from 'react-icons/fi';

type Props = {
  index: number;
  userRating: number;
  eventHandler: React.FormEventHandler<HTMLInputElement>;
};

const RatingInput = ({ index, userRating, eventHandler }: Props) => {
  return (
    <label
      className="group relative cursor-pointer"
      data-state={userRating >= index ? 'checked' : ''}
    >
      <FiStar
        className={
          'text-4xl group-[[data-state=checked]]:fill-coachify-teal-500 group-[[data-state=checked]]:stroke-coachify-teal-500'
        }
      />
      <input
        className="sr-only"
        type="radio"
        name="rating"
        id="rating"
        value={index}
        onChange={eventHandler}
      />
      <span className="sr-only">{index} Star</span>
    </label>
  );
};
export default RatingInput;
