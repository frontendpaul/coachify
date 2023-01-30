import { FiStar } from 'react-icons/fi';

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      <span className="sr-only">rate: {rating} out of 5</span>
      {Array(5)
        .fill(1)
        .map((item, index) =>
          index < rating ? (
            <FiStar key={index} style={{ fill: 'currentcolor' }} />
          ) : (
            <FiStar key={index} />
          )
        )}
    </div>
  );
};
export default Stars;
