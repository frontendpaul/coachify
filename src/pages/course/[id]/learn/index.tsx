import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Chapter, getCourseById } from 'server/courses';
import Content from './Content';
import * as Tabs from '@radix-ui/react-tabs';
import SectionTitle from '@components/ui/SectionTitle';
import { useDraggable } from 'react-use-draggable-scroll';
import TabTrigger from './TabTrigger';
import { isMediumScreenAtom } from '@components/Layout';
import { useAtom } from 'jotai';

const Learn = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const course = getCourseById(id);

  const videoPlayer = useRef<HTMLVideoElement>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    if (course) {
      setCurrentChapter(course.course_content.sections[0].chapters[0]);
    }
  }, [course]);

  useEffect(() => {
    if (course && currentChapter) {
      course.course_content.sections.forEach((section) => {
        section.chapters.some((chapter) => chapter.id === currentChapter.id) &&
          setCurrentSection(section.id);
        return;
      });
    }
  }, [course, currentChapter]);

  const [isMediumScreen] = useAtom(isMediumScreenAtom);

  const [value, setValue] = useState('about');

  useEffect(() => {
    !isMediumScreen && value === 'content' && setValue('about');
  }, [isMediumScreen, value, setValue]);

  if (!course) {
    return (
      <>
        <Head>
          <title>No such course found.</title>
          <meta
            name="description"
            content="No such course found. Please search again or return to homepage."
          />
        </Head>
        <div className="grid place-items-center mt-20">
          <h1 className="text-xl text-semibold">No such course found.</h1>
          <Link href="/" className="underline">
            Go back to Homepage
          </Link>
        </div>
      </>
    );
  }

  if (!currentChapter || !currentSection) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{course.title}</title>
        <meta
          name="description"
          content={course.course_metadata.short_description}
        />
      </Head>

      <section className="flex flex-col min-h-screen py-6">
        <h1 className="sr-only">{course.title}</h1>
        <div className="lg:grid lg:grid-cols-[1fr,min(30%,550px)] border-white/10">
          <h2 className="sr-only">Video for {currentChapter?.title}</h2>
          <video
            className="w-full max-h-[50vh] lg:max-h-[70vh] bg-coachify-teal-1200"
            src={course.course_content.sections[0].chapters[0].video.src}
            controls
            ref={videoPlayer}
          ></video>
          <div className="px-2 lg:px-4 hidden lg:block h-0 min-h-full overflow-auto custom-scrollbar">
            <SectionTitle className="mb-4">Course content</SectionTitle>
            <Content
              content={course.course_content}
              currentSectionId={currentSection}
              currentChapter={currentChapter}
              setCurrentChapter={setCurrentChapter}
              videoPlayer={videoPlayer}
            />
          </div>
        </div>
        <div className="flex-1 bg-coachify-teal-1200 px-4 pb-4 md:px-6 md:pb-6">
          <Tabs.Root value={value} onValueChange={setValue}>
            <Tabs.List className="flex gap-2 md:gap-4 py-2 md:py-4 overflow-auto [&>*]:whitespace-nowrap border-b border-white/10">
              {/* TODO: add scroll on mouse drag */}
              {isMediumScreen && <TabTrigger value="content" text="Content" />}
              <TabTrigger value="about" text="About" />
              <TabTrigger value="resources" text="Resources" />
              <TabTrigger value="discussion" text="Discussion" />
              <TabTrigger value="reviews" text="Reviews" />
            </Tabs.List>

            {isMediumScreen && (
              <Tabs.Content value="content" className="py-4 md:py-6">
                <Content
                  content={course.course_content}
                  currentSectionId={currentSection}
                  currentChapter={currentChapter}
                  setCurrentChapter={setCurrentChapter}
                  videoPlayer={videoPlayer}
                />
              </Tabs.Content>
            )}

            <Tabs.Content value="about">
              <div className="my-4">
                <SectionTitle>About title</SectionTitle>
              </div>
            </Tabs.Content>
            <Tabs.Content value="resources">
              <div className="my-4">
                <SectionTitle>Resources</SectionTitle>
              </div>
            </Tabs.Content>
            <Tabs.Content value="discussion">
              <div className="my-4">
                <SectionTitle>Comments</SectionTitle>
              </div>
            </Tabs.Content>
            <Tabs.Content value="reviews">
              <div className="my-4">
                <SectionTitle>Reviews</SectionTitle>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
};
export default Learn;
