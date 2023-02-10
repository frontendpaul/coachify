import Button from '@components/ui/Button';
import SectionTitle from '@components/ui/SectionTitle';
import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import React from 'react';
import { useEffect, useState } from 'react';
import { FiPlay, FiLock, FiChevronDown } from 'react-icons/fi';
import { ProductContent } from 'types/supabase';
import { toHumanReadableTime } from 'utils/helpers';

type Props = {
  content: ProductContent;
  videoPlayer: React.RefObject<HTMLVideoElement>;
};

const ContentOverview = ({ content, videoPlayer }: Props) => {
  const [activeChapter, setActiveChapter] = useState<string>('');
  const [showAllSections, setShowAllSections] = useState<boolean>(false);

  const numberOfSections = (content.sections.length as number) || 0;
  const numberOfVideos = content.sections.reduce(
    (accumulator, current) => accumulator + current.chapters.length,
    0
  );

  const totalDuration = content.sections.reduce((allTotal, section) => {
    const sectionTotal = section.chapters.reduce((total, chapter) => {
      return total + chapter.video.duration;
    }, 0);
    return allTotal + sectionTotal;
  }, 0);

  useEffect(() => {
    content.sections[0]?.chapters.length &&
      setActiveChapter(content.sections[0].chapters[0].id as string);
  }, [content]);

  /*
  Maximal number of sections to show on init.
  If Course contains more, a 'Show all sections' button will be rendered.
  On Button click, all other sections will also be rendered.
  */
  const sectionsOnInit = 5;

  if (!content.sections || !content.sections.length) {
    return (
      <section>
        <SectionTitle>Content of this course</SectionTitle>
        <p>No content yet</p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle>Content of this course</SectionTitle>
        <p className="text-sm text-white/75 xl:text-base">
          {numberOfSections} Sections • {numberOfVideos} Videos •{' '}
          {toHumanReadableTime(totalDuration)}
        </p>
      </div>

      <Accordion.Root type="single" defaultValue="0" collapsible>
        {/** Initially render only first @param sectionsOnInit sections */}
        <ol>
          {content.sections
            .filter((_, index) => index < sectionsOnInit)
            .map((section, sectionIndex) => (
              <Accordion.Item
                key={section.id}
                value={sectionIndex.toString()}
                asChild
                className="group"
              >
                <li>
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={clsx(
                        'flex w-full items-center justify-between',
                        'transition-200-out-quart rounded-lg p-2 sm:p-3',
                        'hover:bg-white/5 data-[state=open]:bg-coachify-teal-1000'
                      )}
                    >
                      <div className="flex items-center gap-2 sm:gap-4">
                        {sectionIndex === 0 ? <FiPlay /> : <FiLock />}
                        <span>
                          {sectionIndex + 1}. {section.title}
                        </span>
                      </div>
                      <FiChevronDown
                        className={clsx(
                          'transition-200-out-quart group-[[data-state=open]]:rotate-180'
                        )}
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden group-[[data-state=open]]:animate-slideDown group-[[data-state=closed]]:animate-slideUp">
                    <ol>
                      {section.chapters.map((chapter, chapterIndex) => (
                        // TODO: remove Fragment and use li instead
                        <li className="ml-6 sm:ml-8" key={chapter.id}>
                          {sectionIndex === 0 ? (
                            <button
                              className="transition-200-out-quart flex w-full px-2 py-2 text-left text-sm hover:text-coachify-teal-500
                          data-[active=true]:text-coachify-teal-500 sm:px-3"
                              data-active={chapter.id === activeChapter}
                              onClick={(e) => {
                                const videoSrc =
                                  e.currentTarget.querySelector<HTMLInputElement>(
                                    '#video_src'
                                  )?.value || '';

                                videoPlayer.current?.setAttribute(
                                  'src',
                                  videoSrc
                                );
                                videoPlayer.current?.load();

                                videoPlayer.current?.focus();
                                videoPlayer.current?.scrollIntoView(true);

                                setActiveChapter(chapter.id as string);
                              }}
                            >
                              <input
                                id="video_src"
                                type="hidden"
                                value={chapter.video.src}
                              />
                              <span>
                                {sectionIndex + 1}.{chapterIndex + 1}.
                              </span>
                              <div className="ml-1 flex-1 sm:flex sm:justify-between">
                                <p>{chapter.title}</p>
                                <p className="">
                                  {toHumanReadableTime(chapter.video.duration)}
                                </p>
                              </div>
                            </button>
                          ) : (
                            <div className="flex px-2 py-2 text-sm sm:px-3">
                              <span>
                                {sectionIndex + 1}.{chapterIndex + 1}.
                              </span>
                              <div className="ml-1 flex-1 sm:flex sm:justify-between">
                                <p>{chapter.title}</p>
                                <p className="">
                                  {toHumanReadableTime(chapter.video.duration)}
                                </p>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  </Accordion.Content>
                </li>
              </Accordion.Item>
            ))}
        </ol>

        {!showAllSections && content.sections.length > sectionsOnInit && (
          <div className="mt-6 flex justify-center">
            <Button
              fill="ghost"
              icon="icon-right"
              onClick={() => setShowAllSections(true)}
            >
              Show all sections
              <FiChevronDown />
            </Button>
          </div>
        )}
        {/* Show the rest of sections on user request */}
        {showAllSections && (
          <ol>
            {content.sections
              .filter((_, index) => index >= sectionsOnInit)
              .map((section, sectionIndex) => (
                <li key={section.id}>
                  <Accordion.Item
                    value={(sectionIndex + sectionsOnInit + 1).toString()}
                    className="group"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger
                        className={clsx(
                          'flex w-full items-center justify-between',
                          'transition-200-out-quart rounded-lg p-2 sm:p-3',
                          'hover:bg-coachify-teal-1000/25 data-[state=open]:bg-coachify-teal-1000'
                        )}
                      >
                        <div className="flex items-center gap-2 sm:gap-4">
                          <FiLock />
                          <span>
                            {sectionIndex + sectionsOnInit + 1}. {section.title}
                          </span>
                        </div>
                        <FiChevronDown
                          className={clsx(
                            'transition-200-out-quart group-[[data-state=open]]:rotate-180'
                          )}
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden group-[[data-state=open]]:animate-slideDown group-[[data-state=closed]]:animate-slideUp">
                      <ol>
                        {section.chapters.map((chapter, chapterIndex) => (
                          <li
                            key={chapter.id}
                            className="ml-6 flex px-2 py-2 text-sm sm:ml-8 sm:px-3"
                          >
                            <span>
                              {sectionIndex + sectionsOnInit + 1}.
                              {chapterIndex + 1}.
                            </span>
                            <div className="ml-1 flex-1 sm:flex sm:justify-between">
                              <p>{chapter.title}</p>
                              <p className="">
                                {toHumanReadableTime(chapter.video.duration)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </Accordion.Content>
                  </Accordion.Item>
                </li>
              ))}
          </ol>
        )}
      </Accordion.Root>
    </section>
  );
};
export default ContentOverview;
