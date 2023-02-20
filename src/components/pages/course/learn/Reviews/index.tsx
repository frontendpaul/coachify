import SectionTitle from '@components/ui/SectionTitle';
import useReviews from 'hooks/useReviews';
import RatingsSummary from './RatingsSummary';
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

  return (
    <section className="grid gap-6">
      <SectionTitle>How other students rated this course</SectionTitle>
      <RatingsSummary productId={productId} />
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
