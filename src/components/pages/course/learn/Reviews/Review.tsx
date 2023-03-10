import Avatar from '@components/ui/Avatar';
import LinkWithChevron from '@components/ui/LinkWithChevron';
import { useRef, useState, useEffect } from 'react';
import Stars from '../../Reviews/Review/Stars';
import { Review } from 'types/supabase';
import { toReadableDate } from 'utils/helpers';
import clsx from 'clsx';
import { FiChevronDown } from 'react-icons/fi';

const Review = ({ review }: { review: Review }) => {
  const reviewParagraph = useRef<HTMLParagraphElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  /*
  On initial render ref is undefined.
  No effect dependecies in order to get height on second (end every further) render.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleResize = () => {
      const maxOffsetHeight = 120; // maxLines * fontSize * lineHeight
      const sh = reviewParagraph.current?.scrollHeight as number;
      setScrollHeight(sh);

      reviewParagraph.current?.style.setProperty('--scroll-height', sh + 'px');

      if (scrollHeight > maxOffsetHeight) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <li className="flex flex-col gap-4 rounded-lg bg-coachify-teal-1100/75 p-3 sm:p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8">
          <Avatar user={review.owner} />
        </div>
        <div className="flex-1">
          <p className="mb-1 font-semibold">{review.owner.name}</p>
          <div className="flex items-center justify-between text-xs">
            <Stars rating={review.rating} />
            <p className="text-white/75">
              <span className="hidden sm:inline">Posted on </span>
              {review.updated_at && toReadableDate(review.updated_at)}
            </p>
          </div>
        </div>
      </div>
      <p
        ref={reviewParagraph}
        className={clsx(
          'transition-200-out-quart max-h-[120px] overflow-hidden text-sm text-coachify-gray-200',
          !isExpanded && !isTransitioning && 'line-clamp-6',
          isExpanded && '!max-h-[var(--scroll-height)] line-clamp-none',
          !!review.body || '!hidden'
        )}
      >
        {review.body}
      </p>
      {isOverflowing && (
        <button
          className="group flex items-center gap-2 text-sm"
          onClick={() => {
            setIsExpanded(!isExpanded);
            setIsTransitioning(true);
          }}
        >
          <span>Read full review</span>
          <FiChevronDown
            className={clsx(
              'transition-200-out-quart',
              isExpanded && 'rotate-180'
            )}
          />
        </button>
      )}
    </li>
  );
};
export default Review;
