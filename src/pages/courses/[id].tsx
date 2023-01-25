import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCourseById } from 'server/courses';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import Button from '@components/ui/Button';
import { FiGlobe, FiHeart, FiShare2 } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import clsx from 'clsx';

const Course = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const course = getCourseById(id);

  let level = 0;
  if (course?.course_metadata.level === 'All levels') level = 0;
  if (course?.course_metadata.level === 'Beginner') level = 1;
  if (course?.course_metadata.level === 'Intermediate') level = 2;
  if (course?.course_metadata.level === 'Expert') level = 3;

  const clean = DOMPurify.sanitize('<strong>text</strong>', {
    ALLOWED_TAGS: ['h3', 'p', 'span', 'strong', 'br', 'ul', 'li'],
  });

  if (!course) {
    return (
      <div className="grid place-items-center mt-20">
        <h3 className="text-xl text-semibold">No such course found.</h3>
        <Link href="/" className="underline">
          Go back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <section
      className="max-w-2xl xl:max-w-7xl mx-auto px-4 md:px-6
      xl:grid xl:grid-cols-[1fr,min(35%,480px)] xl:gap-6"
    >
      {/* lg:grid lg:grid-cols-[3fr,2fr] lg:gap-2  */}
      <div className="mb-6 xl:mb-0 xl:order-2">
        {/* <Image src={course.cover_image} width={640} height={360} alt="" /> */}
        <video
          className="w-full"
          src={course.course_content.sections[0].chapters[0].video.url}
          controls
        ></video>
      </div>

      <div className="grid gap-16">
        <div className="grid gap-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold mb-3">
              {course.title}
            </h1>
            <p className="lg:text-lg">
              {course.course_metadata.short_description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src="/demo_profile_pic.png"
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <p className="leading-none">{course.owner}</p>
          </div>
          <p className="text-2xl font-semibold">
            {course.price
              ? course.price.toString().replace(/\./g, ',') + ' €'
              : 'Free'}
            {course.old_price && (
              <s className="ml-4 text-base text-white/75 line-through">
                {course.old_price.toString().replace(/\./g, ',') + ' €'}
              </s>
            )}
          </p>
          <div className="grid grid-cols-2 justify-items-start gap-4 sm:flex w-full">
            <Button className="w-full sm:w-44">
              {course.free ? 'Enroll now' : 'Buy now'}
            </Button>
            <Button
              fill="outline"
              icon="icon-left"
              className="w-full sm:w-auto"
            >
              <FiHeart />
              <span>
                Save <span className="hidden sm:inline">for later</span>
              </span>
            </Button>
            <Button fill="outline" icon="icon-only">
              <FiShare2 />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 2xl:gap-6">
          <div className="grid justify-items-center gap-2 p-4 2xl:p-6 bg-coachify-teal-700 rounded-lg">
            {level === 0 && (
              <Image
                src="/icons/bars_blank.svg"
                alt=""
                width={32}
                height={32}
              />
            )}
            {level === 1 && (
              <Image
                src="/icons/bars_beginner.svg"
                alt=""
                width={32}
                height={32}
              />
            )}
            {level === 2 && (
              <Image
                src="/icons/bars_intermediate.svg"
                alt=""
                width={32}
                height={32}
              />
            )}
            {level === 3 && (
              <Image
                src="/icons/bars_expert.svg"
                alt=""
                width={32}
                height={32}
              />
            )}
            <span>{course.course_metadata.level}</span>
          </div>
          <div className="grid justify-items-center gap-2 p-4 2xl:p-6 bg-coachify-teal-700 rounded-lg">
            <FiGlobe className="w-8 h-8" />
            <span>{course.course_metadata.language}</span>
          </div>
          <div className="grid justify-items-center gap-2 p-4 2xl:p-6 bg-coachify-teal-700 rounded-lg">
            <span className="text-2xl font-bold">
              {course.course_metadata.participants}
            </span>
            <span>Students</span>
          </div>
          <div className="grid justify-items-center gap-2 p-4 2xl:p-6 bg-coachify-teal-700 rounded-lg">
            <div className="flex items-center gap-2 text-2xl">
              <span className="font-bold">{course.course_metadata.rating}</span>
              <AiFillStar />
            </div>
            <span>Avg. Rating</span>
          </div>
        </div>

        <div>course content</div>

        <div>
          description
          <div dangerouslySetInnerHTML={{ __html: clean }}></div>
        </div>

        <div>skills</div>

        <div>teacher</div>

        <div>reviews</div>

        <div>more from creator</div>
      </div>
    </section>
  );
};
export default Course;
