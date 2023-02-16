import SectionTitle from '@components/ui/SectionTitle';
import useReviews from 'hooks/useReviews';
import { Review } from 'types/supabase';
import { toPercentage } from 'utils/helpers';
import StarsAverage from '../../Reviews/StarsAverage';
import RatingBar from './RatingBar';
import ReviewCard from './Review';
import ReviewDialog from './ReviewDialog';

const Reviews = ({ productId }: { productId: string }) => {
  const { reviews, isLoading } = useReviews(productId);

  if (isLoading) {
    return (
      <section className="grid gap-6">
        <SectionTitle>How other students rated this course</SectionTitle>
        <p>Loading...</p>
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="grid gap-6">
        <SectionTitle>How other students rated this course</SectionTitle>
        <h2>There are no reviews yet. Be the first to write one!</h2>
        <ReviewDialog productId={productId} />
      </section>
    );
  }

  const reviewsTotal = reviews.length;

  let ratingPercentages: number[] = [];
  for (let i = 0; i < 5; i++) {
    const ratingsCount = reviews.filter(
      (review) => review.rating === i + 1
    ).length;

    const percentage = toPercentage(reviewsTotal, ratingsCount);

    ratingPercentages.push(percentage);
  }

  const avgRating =
    reviews.reduce((accumulator, review) => accumulator + review.rating, 0) /
    reviewsTotal;

  const numberFormat = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
  });

  return (
    <section className="grid gap-6">
      <SectionTitle>How other students rated this course</SectionTitle>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <div className="flex items-center gap-2 text-2xl">
            <h3 className="font-semibold">{numberFormat.format(avgRating)}</h3>
            <StarsAverage rating={avgRating ?? 0} />
          </div>
          <p className="text-sm text-coachify-gray-300">
            based on {reviewsTotal} {reviewsTotal > 1 ? 'reviews' : 'review'}
          </p>
        </div>

        <ul className="flex flex-col-reverse gap-1 text-sm">
          {ratingPercentages.map((rating, index) => (
            <RatingBar key={index} percentage={rating} index={index} />
          ))}
        </ul>
      </div>

      <div className="mb-4 mt-2 sm:justify-self-start">
        <ReviewDialog productId={productId} />
      </div>

      <ul className="grid gap-2">
        {reviews.reverse().map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
};
export default Reviews;
