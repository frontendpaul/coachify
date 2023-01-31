import SectionTitle from '@components/ui/SectionTitle';
import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FiPlay, FiChevronDown } from 'react-icons/fi';
import { Chapter, CourseContent } from 'server/courses';

type Props = {
  content: CourseContent;
  currentSectionId: string;
  currentChapter: Chapter;
  setCurrentChapter: Dispatch<SetStateAction<Chapter | null>>;
  videoPlayer: RefObject<HTMLVideoElement>;
};

const Content = ({
  content,
  currentSectionId,
  currentChapter,
  setCurrentChapter,
  videoPlayer,
}: Props) => {
  const [value, setValue] = useState(currentSectionId);

  if (!content || !currentChapter) {
    return <h1>null</h1>;
  }

  return (
    <Accordion.Root
      type="single"
      value={value}
      onValueChange={setValue}
      collapsible
    >
      {/** Initially render only first @param sectionsOnInit sections */}
      <ol>
        {content.sections.map((section, sectionIndex) => (
          <li key={section.id}>
            <Accordion.Item value={section.id} className="group">
              <Accordion.Header>
                <Accordion.Trigger
                  className={clsx(
                    'flex items-center justify-between w-full',
                    'p-2 sm:p-3 rounded-lg transition-200-out-quart',
                    'hover:bg-white/5 data-[state=open]:bg-coachify-teal-900',
                    'text-sm xl:text-base'
                  )}
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    {currentSectionId === section.id ? (
                      <FiPlay />
                    ) : (
                      <div className="w-[1em]"></div>
                    )}
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
                    <li key={chapter.id} className="ml-6 sm:ml-8">
                      <button
                        className="px-2 sm:px-3 py-2 w-full flex text-sm text-left transition-200-out-quart 
                          hover:text-coachify-teal-500 data-[active=true]:text-coachify-teal-500"
                        data-active={chapter.id === currentChapter.id}
                        onClick={(e) => {
                          const videoSrc =
                            e.currentTarget.querySelector<HTMLInputElement>(
                              '#video_src'
                            )?.value || '';

                          videoPlayer.current?.setAttribute('src', videoSrc);
                          videoPlayer.current?.load();

                          videoPlayer.current?.focus();
                          videoPlayer.current?.scrollIntoView(true);

                          setCurrentChapter(chapter);
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
                  ))}
                </ol>
              </Accordion.Content>
            </Accordion.Item>
          </li>
        ))}
      </ol>
    </Accordion.Root>
  );
};
export default Content;
