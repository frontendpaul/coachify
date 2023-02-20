import useReviewsMetadata from 'hooks/useReviewsMetadata';
import { useEffect, useState } from 'react';
import StarsAverage from '../../Reviews/StarsAverage';
import RatingBar from './RatingBar';

const RatingsSummary = ({ productId }: { productId: string }) => {
  const { metadata, isLoading } = useReviewsMetadata(productId);
  const [average, setAverage] = useState(0);
  const [ratings, setRatings] = useState([0]);

  const calcAverage = (ratings: number[], total: number) => {
    const sumOfRatings = ratings.reduce(
      (accumulator, rating) => accumulator + rating,
      0
    );
    return sumOfRatings / total || 0;
  };

  const numberFormat = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
  });

  useEffect(() => {
    if (metadata) {
      setAverage(calcAverage(metadata.ratings, metadata.number_of_reviews));
      setRatings(metadata.ratings);
    }
  }, [metadata]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!metadata) {
    return <div>No data.</div>;
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <div className="flex items-center gap-2 text-2xl">
          <h3 className="font-semibold">{numberFormat.format(average)}</h3>
          <StarsAverage rating={average} />
        </div>
        <p className="text-sm text-coachify-gray-300">
          based on {metadata.number_of_reviews}{' '}
          {metadata.number_of_reviews > 1 ? 'reviews' : 'review'}
        </p>
      </div>

      <ul className="flex flex-col-reverse gap-1 text-sm">
        {ratings.map((rating, index) => (
          <RatingBar
            key={index}
            total={metadata.number_of_reviews}
            rating={rating}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};
export default RatingsSummary;
