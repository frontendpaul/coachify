import Avatar from '@components/ui/Avatar';
import LinkWithChevron from '@components/ui/LinkWithChevron';
import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';
import { Review } from 'server/courses';
import Stars from './Stars';

const Review = ({
  review,
  moreThan3,
}: {
  review: Review;
  moreThan3: boolean;
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

  return (
    <li
      className={clsx(
        'flex flex-col gap-4 p-3 sm:p-4 bg-coachify-teal-1100/75 rounded-lg',
        moreThan3 && 'last:hidden sm:last:flex 2xl:last:hidden'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8">
          <Avatar user={review.author} />
        </div>
        <div className="flex-1">
          <p className="font-semibold mb-1">{review.author.name}</p>
          <div className="flex justify-between items-center text-xs">
            <Stars rating={review.rating} />
            <p className="text-white/75">{review.created_at}</p>
          </div>
        </div>
      </div>
      <p ref={reviewParagraph} className="text-sm line-clamp-8">
        {review.copy}
      </p>
      {isOverflowing && <LinkWithChevron href="/" text="Read full review" />}
    </li>
  );
};

export default Review;
