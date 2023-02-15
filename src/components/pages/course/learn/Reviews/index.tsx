import Button from '@components/ui/Button';
import SectionTitle from '@components/ui/SectionTitle';
import { AiFillStar } from 'react-icons/ai';
import { Review } from 'types/supabase';
import { toPercentage } from 'utils/helpers';
import RatingBar from './RatingBar';
import ReviewCard from './Review';

const Reviews = ({ reviews }: { reviews: Review[] | undefined }) => {
  if (!reviews || reviews.length === 0) {
    return <h2>No reviews yet.</h2>;
  }

  const reviewsTotal = reviews.length;

  let ratingPercentages: number[] = [];
  reviews.forEach((_, index) => {
    const ratingsCount = reviews.filter(
      (review) => review.rating === index + 1
    ).length;

    const percentage = toPercentage(reviewsTotal, ratingsCount);

    ratingPercentages.push(percentage);
  });

  const avgRating =
    reviews.reduce((accumulator, review) => accumulator + review.rating, 0) /
    reviewsTotal;

  return (
    <section className="grid gap-6">
      <SectionTitle>How other students rated this course</SectionTitle>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <div className="flex items-center gap-2 text-2xl">
            <AiFillStar />
            <h3 className="font-semibold">
              {avgRating}{' '}
              <span className="text-base font-normal text-coachify-gray-300">
                / 5
              </span>
            </h3>
          </div>
          <p className="text-sm text-coachify-gray-300">
            (based on {reviewsTotal} {reviewsTotal > 1 ? 'reviews' : 'review'})
          </p>
        </div>

        <ul className="flex flex-col-reverse gap-1 text-sm">
          {ratingPercentages.map((rating, index) => (
            <RatingBar key={index} percentage={rating} index={index} />
          ))}
        </ul>
      </div>

      <Button className="mt-2 sm:w-52 sm:justify-self-start">
        Write your review
      </Button>

      <ul className="grid gap-2">
        {reviews.reverse().map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
};
export default Reviews;
