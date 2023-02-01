import Button from '@components/ui/Button';
import SectionTitle from '@components/ui/SectionTitle';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { sanitizeText } from 'utils/helpers';

const Description = ({ description }: { description: string }) => {
  const collapsibleDescription = useRef<HTMLDivElement>(null);
  const [makeDescriptionCollapsible, setMakeDescriptionCollapsible] =
    useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  /*
  On initial render ref is undefined.
  No effect dependecies array in order to get height on second (end every further) render.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const height = collapsibleDescription.current?.scrollHeight as number;
    setDescriptionHeight(height);
  });

  useEffect(() => {
    const cssHeight = descriptionHeight + 'px';
    collapsibleDescription.current?.style.setProperty(
      '--radix-collapsible-content-height',
      cssHeight
    );

    if (descriptionHeight > 448) {
      setMakeDescriptionCollapsible(true);
    }
  }, [descriptionHeight]);

  const sanitizedCourseDescription = sanitizeText(description);

  return (
    <section>
      <div className="grid gap-6">
        <SectionTitle>About this course</SectionTitle>
        <div
          ref={collapsibleDescription}
          data-state={showFullDescription ? 'open' : 'closed'}
          id="collapsible-description"
          className={clsx(
            'transition-200-out-quart relative overflow-hidden',
            makeDescriptionCollapsible &&
              'data-[state=open]:max-h-[var(--radix-collapsible-content-height)] data-[state=closed]:max-h-[448px]'
          )}
        >
          <div
            className="grid gap-4 text-coachify-gray-300 [&_a]:underline [&_li]:list-inside [&_ul]:list-disc [&_ol]:list-decimal"
            dangerouslySetInnerHTML={{
              __html: sanitizedCourseDescription,
            }}
          ></div>
          {makeDescriptionCollapsible && (
            <div
              className={clsx(
                'transition-200-out-quart absolute bottom-0 h-24 w-full bg-gradient-to-b from-transparent to-coachify-teal-1200',
                showFullDescription
                  ? 'invisible opacity-0'
                  : 'visible opacity-100'
              )}
            ></div>
          )}
        </div>
        {makeDescriptionCollapsible && !showFullDescription && (
          <Button
            className="place-self-center"
            fill="ghost"
            icon="icon-right"
            onClick={() => setShowFullDescription(true)}
            aria-controls="collapsible-description"
            data-state={showFullDescription ? 'open' : 'closed'}
          >
            Show full description
            <FiChevronDown />
          </Button>
        )}
      </div>
    </section>
  );
};
export default Description;
