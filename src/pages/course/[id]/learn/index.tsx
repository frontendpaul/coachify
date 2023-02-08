import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Chapter, getCourseById } from 'server/courses';
import Content from '@components/pages/course/learn/Content';
import * as Tabs from '@radix-ui/react-tabs';
import SectionTitle from '@components/ui/SectionTitle';
import { isMediumScreenAtom } from '@components/Layout';
import { useAtom } from 'jotai';
import About from '@components/pages/course/learn/About';
import Reviews from '@components/pages/course/learn/Reviews';
import Resources from '@components/pages/course/learn/Resources';
import TabTriggerList from '@components/pages/course/learn/TabTriggerList';

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
        <div className="mt-20 grid place-items-center">
          <h1 className="text-semibold text-xl">No such course found.</h1>
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

      <section className="flex min-h-screen flex-col">
        <h1 className="sr-only">{course.title}</h1>
        <div className="border-white/10 lg:grid lg:grid-cols-[1fr,min(30%,550px)]">
          <h2 className="sr-only">Video for {currentChapter?.title}</h2>
          <video
            className="max-h-[50vh] w-full bg-coachify-teal-1200 lg:max-h-[70vh]"
            src={course.course_content.sections[0].chapters[0].video.src}
            controls
            ref={videoPlayer}
          ></video>
          <div className="custom-scrollbar hidden h-0 min-h-full overflow-auto px-2 lg:block lg:px-4">
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
            {/* TODO: add scroll on mouse drag */}
            <TabTriggerList />

            <div className="mx-auto py-4 md:max-w-2xl md:py-6">
              {isMediumScreen && (
                <Tabs.Content value="content">
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
                {currentChapter.description ? (
                  <About description={currentChapter.description} />
                ) : (
                  <h2>
                    A description for this chapter has not yet been added by the
                    author.
                  </h2>
                )}
              </Tabs.Content>
              <Tabs.Content value="resources">
                {currentChapter.resources ? (
                  <Resources resources={currentChapter.resources} />
                ) : (
                  <h2>No resources attached to this chapter.</h2>
                )}
              </Tabs.Content>
              <Tabs.Content value="discussion">
                <div className="mx-auto lg:max-w-3xl">
                  <SectionTitle>Comments</SectionTitle>
                </div>
              </Tabs.Content>
              <Tabs.Content value="announcements">
                <div className="mx-auto lg:max-w-3xl">
                  <SectionTitle>Announcements</SectionTitle>
                </div>
              </Tabs.Content>
              <Tabs.Content value="reviews">
                <Reviews reviews={course.reviews} />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
};
export default Learn;
