import useReviewsMetadata from 'hooks/useReviewsMetadata';
import { useEffect, useRef, useState } from 'react';
import { getAverageRating, toFixed } from 'utils/helpers';
import StarsAverage from '../../Reviews/StarsAverage';
import RatingBar from './RatingBar';

const RatingsSummary = ({ productId }: { productId: string }) => {
  const { metadata, isLoading } = useReviewsMetadata(productId);
  const [average, setAverage] = useState(0);
  const [ratings, setRatings] = useState([0]);

  useEffect(() => {
    if (metadata) {
      setAverage(
        getAverageRating(metadata.ratings, metadata.number_of_reviews)
      );
      setRatings(metadata.ratings);
    }
  }, [metadata]);

  const [percentWidth, setPercentWidth] = useState(0);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ref)
      ref.current?.style.setProperty('--percent-width', percentWidth + 'px');
  }, [percentWidth]);

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
          <h3 className="font-semibold">{toFixed(average)}</h3>
          <StarsAverage rating={average} />
        </div>
        <p className="text-sm text-coachify-gray-300">
          based on {metadata.number_of_reviews}{' '}
          {metadata.number_of_reviews > 1 ? 'reviews' : 'review'}
        </p>
      </div>

      <ul ref={ref} className="flex flex-col-reverse gap-1 text-sm">
        {ratings.map((rating, index) => (
          <RatingBar
            key={index}
            total={metadata.number_of_reviews}
            rating={rating}
            index={index}
            percentWidth={percentWidth}
            setPercentWidth={setPercentWidth}
          />
        ))}
      </ul>
    </div>
  );
};
export default RatingsSummary;
