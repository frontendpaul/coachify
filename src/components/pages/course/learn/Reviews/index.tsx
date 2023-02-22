import Button from '@components/ui/Button';
import SectionTitle from '@components/ui/SectionTitle';
import RatingsSummary from './RatingsSummary';
import ReviewCard from './Review';
import ReviewDialog from './ReviewDialog';
import useInfiniteReviews from 'hooks/useInfiniteReviews';
import { useEffect, useState } from 'react';
import useUserReview from 'hooks/useUserReview';
import UserReview from './UserReview';
import { useUser } from '@supabase/auth-helpers-react';

const Reviews = ({ productId }: { productId: string }) => {
  const {
    data,
    size,
    setSize,
    isLoading,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useInfiniteReviews(productId);

  const user = useUser();
  const { data: userReview } = useUserReview(productId, user?.id as string);
  const [hasUserReview, setHasUserReview] = useState(false);

  useEffect(() => {
    if (userReview && userReview.length) {
      setHasUserReview(true);
    }
  }, [userReview]);

  if (isLoading) {
    return (
      <section className="grid gap-6">
        <SectionTitle>How other students rated this course</SectionTitle>
        <p>Loading...</p>
      </section>
    );
  }

  if (!data || !hasUserReview) {
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
      {!hasUserReview && (
        <div className="mb-4 mt-2 sm:justify-self-start">
          <ReviewDialog productId={productId} />
        </div>
      )}

      {hasUserReview && (
        <div>
          <h3 className="mb-2 font-semibold">Your review</h3>
          <UserReview review={userReview[0]} />
        </div>
      )}

      <div className="grid gap-2">
        <ul className="grid gap-2">
          {data.map((review: any) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      </div>
      {isReachingEnd ? (
        <p className="text-coachify-gray-300">No more reviews</p>
      ) : (
        <Button
          fill="outline"
          onClick={() => setSize(size + 1)}
          isLoading={isLoadingMore}
        >
          Load more reviews
        </Button>
      )}
    </section>
  );
};
export default Reviews;
