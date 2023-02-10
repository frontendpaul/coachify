import Avatar from '@components/ui/Avatar';
import LinkWithChevron from '@components/ui/LinkWithChevron';
import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';
import { Review } from 'types/supabase';
import Stars from './Stars';

const Review = ({
  review,
  moreThan3,
}: {
  review: Review;
  moreThan3?: boolean;
}) => {
  const reviewParagraph = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  /*
  On initial render ref is undefined.
  No effect dependecies in order to get height on second (end every further) render.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const scrollHeight = reviewParagraph.current?.scrollHeight as number;
    const offsetHeight = reviewParagraph.current?.offsetHeight as number;

    if (scrollHeight > offsetHeight) setIsOverflowing(true);
  });

  const toReadableDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const config = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    } as const;
    return date.toLocaleDateString('de-DE', config);
  };

  return (
    <li
      className={clsx(
        'flex flex-col gap-4 rounded-lg bg-coachify-teal-1100 p-3 sm:p-4',
        moreThan3 && 'last:hidden sm:last:flex 2xl:last:hidden'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8">
          <Avatar user={review.owner} />
        </div>
        <div className="flex-1">
          <p className="mb-1 font-semibold">{review.owner.name}</p>
          <div className="flex items-center justify-between text-xs">
            <Stars rating={review.rating} />
            <p className="text-white/75">
              {review.created_at && toReadableDate(review.created_at)}
            </p>
          </div>
        </div>
      </div>
      <p
        ref={reviewParagraph}
        className="text-sm text-coachify-gray-200 line-clamp-8"
      >
        {review.body}
      </p>
      {isOverflowing && <LinkWithChevron href="/" text="Read full review" />}
    </li>
  );
};

export default Review;
