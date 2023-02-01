import Button from '@components/ui/Button';
import SectionTitle from '@components/ui/SectionTitle';
import { AiFillStar } from 'react-icons/ai';
import Review from './Review';

const Reviews = ({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating: number;
}) => {
  const moreThan3 = reviews?.length > 3;

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
                <AiFillStar />
                <p>{rating}</p>
              </div>
              <p className="text-sm text-white/75">
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {/* Display at most 4 reviews */}
              {reviews.slice(0, 4).map((review) => (
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
