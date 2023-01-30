import Button from '@components/ui/Button';
import SectionTitle from '@components/ui/SectionTitle';
import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { useState } from 'react';
import { FiPlay, FiLock, FiChevronDown } from 'react-icons/fi';
import { CourseContent } from 'server/courses';

type Props = {
  content: CourseContent;
  duration: string;
  videoPlayer: React.RefObject<HTMLVideoElement>;
};

const ContentOverview = ({ content, duration, videoPlayer }: Props) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [showAllSections, setShowAllSections] = useState(false);

  const numberOfSections = (content.sections.length as number) || 0;
  const numberOfVideos = content.sections.reduce(
    (accumulator, current) => accumulator + current.chapters.length,
    0
  );

  /*
  Maximal number of sections to show on init.
  If Course contains more, a 'Show all sections' button will be rendered.
  On Button click, all other sections will also be rendered.
  */
  const sectionsOnInit = 5;

  return (
    <section>
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center mb-6">
        <SectionTitle>Content of this course</SectionTitle>
        <p className="text-sm xl:text-base text-white/75">
          {numberOfSections} Sections • {numberOfVideos} Videos • {duration}
        </p>
      </div>

      <Accordion.Root type="single" defaultValue="0" collapsible>
        {/** Initially render only first @param sectionsOnInit sections */}
        <ol>
          {content.sections
            .filter((item, index) => index < sectionsOnInit)
            .map((section, sectionIndex) => (
              <li key={section.id}>
                <Accordion.Item
                  value={sectionIndex.toString()}
                  className="group"
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={clsx(
                        'flex items-center justify-between w-full',
                        'p-2 sm:p-3 rounded-lg transition-200-out-quart',
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
                        <>
                          {sectionIndex === 0 ? (
                            <li key={chapter.id} className="ml-6 sm:ml-8">
                              <button
                                className="px-2 sm:px-3 py-2 w-full flex text-sm text-left transition-200-out-quart 
                          hover:text-coachify-teal-500 data-[active=true]:text-coachify-teal-500"
                                data-active={chapterIndex === activeChapter}
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

                                  setActiveChapter(chapterIndex);
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
                                  <p className="">{chapter.video.duration}</p>
                                </div>
                              </button>
                            </li>
                          ) : (
                            <li
                              key={chapter.id}
                              className="ml-6 sm:ml-8 px-2 sm:px-3 py-2 flex text-sm"
                            >
                              <span>
                                {sectionIndex + 1}.{chapterIndex + 1}.
                              </span>
                              <div className="ml-1 flex-1 sm:flex sm:justify-between">
                                <p>{chapter.title}</p>
                                <p className="">{chapter.video.duration}</p>
                              </div>
                            </li>
                          )}
                        </>
                      ))}
                    </ol>
                  </Accordion.Content>
                </Accordion.Item>
              </li>
            ))}
        </ol>

        {!showAllSections && content.sections.length > sectionsOnInit && (
          <div className="flex justify-center mt-6">
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
              .filter((item, index) => index >= sectionsOnInit)
              .map((section, sectionIndex) => (
                <li key={section.id}>
                  <Accordion.Item
                    value={(sectionIndex + sectionsOnInit + 1).toString()}
                    className="group"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger
                        className={clsx(
                          'flex items-center justify-between w-full',
                          'p-2 sm:p-3 rounded-lg transition-200-out-quart',
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
                            className="ml-6 sm:ml-8 px-2 sm:px-3 py-2 flex text-sm"
                          >
                            <span>
                              {sectionIndex + sectionsOnInit + 1}.
                              {chapterIndex + 1}.
                            </span>
                            <div className="ml-1 flex-1 sm:flex sm:justify-between">
                              <p>{chapter.title}</p>
                              <p className="">{chapter.video.duration}</p>
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
