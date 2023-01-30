import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCourseById, getCoursesByCreator, Review } from 'server/courses';
import { useRef } from 'react';
import Head from 'next/head';
import SectionTitle from '@components/ui/SectionTitle';
import Overview from '@components/pages/course/Overview';
import InfoCards from '@components/pages/course/InfoCards';
import ContentOverview from '@components/pages/course/ContentOverview';
import Description from '@components/pages/course/Description';
import TagList from '@components/pages/course/TagList';
import Teacher from '@components/pages/course/Teacher';
import Reviews from '@components/pages/course/Reviews';

const Course = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const course = getCourseById(id);

  const videoPlayer = useRef<HTMLVideoElement>(null);

  const creatorCourses = getCoursesByCreator(course?.owner.id as string);
  const filteredCreatorCourses = creatorCourses.filter(
    (creatorCourse) => course?.id != creatorCourse.id
  );

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

  // TODO: Split into Components
  return (
    <>
      <Head>
        <title>{course.title}</title>
        <meta
          name="description"
          content={course.course_metadata.short_description}
        />
      </Head>
      <section
        className="max-w-2xl xl:max-w-7xl mx-auto px-4 md:px-6
      xl:grid xl:grid-cols-[1fr,min(35%,400px)] xl:gap-6"
      >
        <div className="block mb-6 xl:mb-0 xl:order-2 relative">
          {/* TODO: Make the video player sticky to the top/nabar */}
          <video
            className="w-full aspect-video sticky top-[90px]"
            src={course.course_content.sections[0].chapters[0].video.src}
            controls
            ref={videoPlayer}
          ></video>
        </div>

        <div className="grid gap-16">
          <Overview
            title={course.title}
            short_description={course.course_metadata.short_description}
            owner={course.owner}
            free={course.free}
            price={course.price}
            old_price={course.old_price}
          />

          <InfoCards
            level={course.course_metadata.level}
            language={course.course_metadata.language}
            participants={course.course_metadata.participants}
            rating={course.course_metadata.rating}
          />

          <ContentOverview
            content={course.course_content}
            duration={course.course_metadata.duration}
            videoPlayer={videoPlayer}
          />

          <Description description={course.course_metadata.description} />

          <TagList tags={course.course_metadata.skill_tags} />

          <Teacher owner={course.owner} />

          <Reviews
            reviews={course.reviews as Review[]}
            rating={course.course_metadata.rating}
          />

          <section>
            <div className="grid gap-6">
              <SectionTitle>
                Other courses by{' '}
                <Link href="/" className="underline">
                  {course.owner.name}
                </Link>
              </SectionTitle>

              {filteredCreatorCourses.length === 0 ? (
                <p>This creator has no other courses yet.</p>
              ) : (
                <ul>
                  {filteredCreatorCourses.map((course) => (
                    <li key={course.id}>{course.title}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
export default Course;
