import Button from '@components/ui/Button';
import DialogContent from '@components/ui/Dialog/DialogContent';
import TextareaWithLabel from '@components/ui/Inputs/TextareaWithLabel';
import * as Dialog from '@radix-ui/react-dialog';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import useReviewsMetadata from 'hooks/useReviewsMetadata';
import { useRef, useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';
import { mutate } from 'swr';
import { Review } from 'types/supabase';
import RatingInput from './RatingInput';

type Props = {
  productId: string;
  userReview?: Review;
  isOpen: boolean;
  setIsOpen: any;
  setIsPublishToastOpen: any;
  setIsUpdateToastOpen: any;
  setIsErrorToastOpen: any;
};

const ReviewDialog = ({
  productId,
  userReview,
  isOpen,
  setIsOpen,
  setIsPublishToastOpen,
  setIsUpdateToastOpen,
  setIsErrorToastOpen,
}: Props) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const ratingGroup = useRef<HTMLDivElement>(null);
  const [userRating, setUserRating] = useState(userReview?.rating ?? 0);
  const [userReviewText, setUserReviewText] = useState(userReview?.body ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const oldRating = userReview?.rating;

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setIsError(false);
    setUserRating(parseInt(e.currentTarget.value));
  };

  const publish = async () => {
    if (!user) {
      return;
    }
    if (userRating === 0) {
      setIsError(true);
      return;
    }

    setIsLoading(true);

    if (userReview) {
      update();
    } else {
      create();
    }
    updateMetadata();

    setIsLoading(false);
    setIsOpen(false);
  };

  const create = async () => {
    if (!user) {
      return;
    }

    const review = {
      user_id: user.id,
      product_id: productId,
      rating: userRating,
      body: userReviewText,
    };

    const { data, error } = await supabase
      .from('review')
      .insert(review)
      .select();

    if (error) {
      setIsErrorToastOpen(true);
      console.log(error);
      return;
    }

    await mutate(
      `/api/products/${productId}/reviews/user-review?user=${user.id}`
    );

    setIsPublishToastOpen(true);
  };

  const update = async () => {
    if (!user) {
      return;
    }

    const review = {
      id: userReview?.id,
      rating: userRating,
      body: userReviewText,
    };

    const { data, error } = await supabase
      .from('review')
      .update(review)
      .eq('id', review.id);

    if (error) {
      setIsErrorToastOpen(true);
      console.log(error);
      return;
    }

    await mutate(
      `/api/products/${productId}/reviews/user-review?user=${user.id}`
    );

    setIsUpdateToastOpen(true);
  };

  const { metadata } = useReviewsMetadata(productId);

  const updateMetadata = async () => {
    if (metadata) {
      const newTotal = userReview
        ? metadata.number_of_reviews
        : metadata.number_of_reviews + 1;

      const newRatings = [...metadata.ratings].map((rating, index) => {
        if (userRating === oldRating) {
          return rating;
        } else if (oldRating && index === oldRating - 1) {
          return rating - 1;
        } else if (index === userRating - 1) {
          return rating + 1;
        }
        return rating;
      });

      const { data, error } = await supabase.from('reviews_metadata').upsert(
        {
          product_id: productId,
          number_of_reviews: newTotal,
          ratings: newRatings,
        },
        { ignoreDuplicates: false, onConflict: 'product_id' }
      );

      if (error) {
        console.log(error);
        return;
      }

      await mutate(`/api/products/${productId}/reviews/metadata`);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="transition-200-out-quart relative w-[min(90vw,32rem)] overflow-hidden rounded-lg bg-coachify-teal-1100 p-4 text-white shadow-xl sm:my-8 sm:p-6">
          <Dialog.Close asChild>
            <Button
              fill="ghost"
              icon="icon-only"
              className="absolute top-2 right-2 sm:top-4 sm:right-4"
              aria-label="Close"
            >
              <FiX />
            </Button>
          </Dialog.Close>
          <div className="grid gap-4">
            <Dialog.Title className="text-xl font-medium">
              How do you rate this course?
            </Dialog.Title>
            <Dialog.Description className="text-coachify-gray-200">
              Share your experience and help others - your review matters!
            </Dialog.Description>
            <form className="grid gap-6">
              <fieldset>
                <legend className="mb-2 text-sm leading-none text-coachify-gray-300">
                  Rating
                </legend>
                <div className="flex gap-4" ref={ratingGroup}>
                  {/* Generate 5 radio inputs */}
                  {Array.from({ length: 5 }, (_, index) => index).map(
                    (_, index) => (
                      <RatingInput
                        key={index}
                        index={index + 1}
                        userRating={userRating}
                        eventHandler={handleInput}
                      />
                    )
                  )}
                </div>
                {isError && (
                  <p className="mt-2 text-sm text-red-600">
                    You must choose a rating.
                  </p>
                )}
              </fieldset>
              <TextareaWithLabel
                label="Review text (optional)"
                id="review_body"
                rows={5}
                value={userReviewText}
                onChange={(e) => setUserReviewText(e.currentTarget.value)}
              />
              <div className="flex justify-end gap-4">
                <Button fill="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={publish}>Publish</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog.Root>
  );
};
export default ReviewDialog;
