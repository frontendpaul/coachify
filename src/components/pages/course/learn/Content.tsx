import * as Accordion from '@radix-ui/react-accordion';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FiPlay, FiChevronDown } from 'react-icons/fi';
import { Chapter, ProductContent } from 'types/supabase';
import { toReadableTime } from 'utils/helpers';

type Props = {
  content: ProductContent;
  currentSectionId: string;
  currentChapter: Chapter;
  setCurrentChapter: Dispatch<SetStateAction<Chapter | undefined>>;
  videoPlayer: RefObject<HTMLVideoElement>;
};

const Content = ({
  content,
  currentSectionId,
  currentChapter,
  setCurrentChapter,
  videoPlayer,
}: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(currentSectionId);
  }, [currentSectionId]);

  return (
    <Accordion.Root
      type="single"
      value={value}
      onValueChange={setValue}
      collapsible
    >
      <ol className="grid gap-1">
        {content.sections.map((section, sectionIndex) => (
          <li key={section.id}>
            <Accordion.Item value={section.id as string} className="group">
              <Accordion.Header>
                <Accordion.Trigger
                  className="transition-200-out-quart flex w-full items-center justify-between 
                rounded-lg bg-coachify-teal-1100/75 p-3 text-sm hover:bg-coachify-teal-900 
                data-[state=open]:bg-coachify-teal-900 data-[state=open]:hover:bg-coachify-teal-900 lg:bg-transparent lg:hover:bg-white/5 xl:p-3 xl:text-base"
                >
                  <div className="flex items-center gap-2 xl:gap-3">
                    {currentSectionId === section.id ? (
                      <FiPlay />
                    ) : (
                      <div className="w-[1em]"></div>
                    )}
                    <span>
                      {sectionIndex + 1}. {section.title}
                    </span>
                  </div>
                  <FiChevronDown className="transition-200-out-quart group-[[data-state=open]]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden group-[[data-state=open]]:animate-slideDown group-[[data-state=closed]]:animate-slideUp">
                <ol>
                  {section.chapters.map((chapter, chapterIndex) => (
                    <li key={chapter.id} className="ml-6 xl:ml-7">
                      <button
                        className="transition-200-out-quart flex w-full px-2 py-2 text-left text-sm hover:text-coachify-teal-500 
                          data-[active=true]:text-coachify-teal-500 xl:px-3"
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
                          value={chapter?.video?.src || ''}
                        />
                        <span>
                          {sectionIndex + 1}.{chapterIndex + 1}.
                        </span>
                        <div className="ml-1 flex-1 gap-2 xl:flex xl:justify-between">
                          <p>{chapter.title}</p>
                          <p className="">
                            {toReadableTime(chapter?.video?.duration || 0)}
                          </p>
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
