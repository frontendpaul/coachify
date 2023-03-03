import Avatar from '@components/ui/Avatar';
import LinkWithChevron from '@components/ui/LinkWithChevron';
import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';
import { Review } from 'types/supabase';
import Stars from './Stars';
import { toReadableDate } from 'utils/helpers';
import * as Dialog from '@radix-ui/react-dialog';
import { FiChevronRight, FiX } from 'react-icons/fi';
import DialogContent from '@components/ui/Dialog/DialogContent';
import Button from '@components/ui/Button';

const Review = ({
  review,
  moreThan3,
}: {
  review: Review;
  moreThan3?: boolean;
}) => {
  const reviewParagraph = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
              {review.updated_at && toReadableDate(review.updated_at)}
            </p>
          </div>
        </div>
      </div>
      {review.body && (
        <p
          ref={reviewParagraph}
          className="text-sm text-coachify-gray-200 line-clamp-8"
        >
          {review.body}
        </p>
      )}
      {isOverflowing && (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <button className="transition-200-out-quart flex items-center gap-2 text-sm hover:gap-3 md:mb-0.5">
              <span>Read full review</span>
              <FiChevronRight />
            </button>
          </Dialog.Trigger>

          <DialogContent>
            <div className="transition-200-out-quart relative w-[min(90vw,24rem)] overflow-hidden rounded-lg bg-coachify-teal-1100 p-4 text-white shadow-xl sm:my-8 sm:p-6">
              <Dialog.Close asChild>
                <Button
                  fill="ghost"
                  icon="icon-only"
                  className="absolute top-2 right-2"
                  aria-label="Close"
                >
                  <FiX />
                </Button>
              </Dialog.Close>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8">
                  <Avatar user={review.owner} />
                </div>
                <div className="flex-1">
                  <p className="mb-1 font-semibold">{review.owner.name}</p>
                  <div className="flex items-center justify-between text-xs">
                    <Stars rating={review.rating} />
                    <p className="text-white/75">
                      {review.updated_at && toReadableDate(review.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
              {review.body && (
                <p className="mt-4 text-sm text-coachify-gray-200 line-clamp-8">
                  {review.body}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog.Root>
      )}
    </li>
  );
};

export default Review;
