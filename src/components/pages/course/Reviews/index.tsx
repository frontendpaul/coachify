import Button from '@components/ui/Button';
import SectionTitle from '@components/ui/SectionTitle';
import useReviews from 'hooks/useReviews';
import { toFixed } from 'utils/helpers';
import Review from './Review';
import StarsAverage from './StarsAverage';

const Reviews = ({
  productId,
  rating,
}: {
  productId: string;
  rating: number;
}) => {
  const { reviews, count, isLoading } = useReviews(productId, undefined, '4');

  const moreThan3 = count > 3;

  return (
    <section>
      <div className="grid gap-6">
        <SectionTitle>What others say</SectionTitle>
        {!reviews || reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <>
            <div>
              <div className="flex items-center gap-2 text-xl">
                <p>{rating ? toFixed(rating) : '-'}</p>
                <StarsAverage rating={rating ?? 0} />
              </div>
              <p className="text-sm text-white/75">
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {/* Display at most 4 reviews */}
              {reviews.map((review) => (
                <Review key={review.id} review={review} moreThan3={moreThan3} />
              ))}
            </ul>
            <Button fill="outline" className="place-self-start">
              Show all reviews
            </Button>
          </>
        )}
      </div>
    </section>
  );
};
export default Reviews;
