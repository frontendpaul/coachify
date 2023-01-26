import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCourseById } from 'server/courses';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import Button from '@components/ui/Button';
import {
  FiChevronDown,
  FiGlobe,
  FiHeart,
  FiLock,
  FiPlay,
  FiShare2,
} from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import clsx from 'clsx';
import * as Accordion from '@radix-ui/react-accordion';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@components/ui/Avatar';
import Head from 'next/head';

const Course = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const course = getCourseById(id);

  let level = 0;
  if (course?.course_metadata.level === 'All levels') level = 0;
  if (course?.course_metadata.level === 'Beginner') level = 1;
  if (course?.course_metadata.level === 'Intermediate') level = 2;
  if (course?.course_metadata.level === 'Expert') level = 3;

  const numberOfSections =
    (course?.course_content.sections.length as number) || 0;
  const numberOfVideos = course?.course_content.sections.reduce(
    (accumulator, current) => accumulator + current.chapters.length,
    0
  );

  const sanitizedCourseDescription = DOMPurify.sanitize(
    course?.course_metadata.description as string,
    {
      ALLOWED_TAGS: ['p', 'span', 'strong', 'br', 'ul', 'ol', 'li', 'a'],
      FORBID_ATTR: ['style'],
    }
  );

  const sanitizedCreatorDescription = DOMPurify.sanitize(
    course?.owner.description as string,
    {
      ALLOWED_TAGS: ['p', 'span', 'strong', 'br', 'ul', 'ol', 'li', 'a'],
      FORBID_ATTR: ['style'],
    }
  );

  const videoPlayer = useRef<HTMLVideoElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showAllSections, setShowAllSections] = useState(false);
  const collapsibleDescription = useRef<HTMLDivElement>(null);
  const [makeDescriptionCollapsible, setMakeDescriptionCollapsible] =
    useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

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
      xl:grid xl:grid-cols-[1fr,min(35%,480px)] xl:gap-6"
      >
        <div className="mb-6 xl:mb-0 xl:order-2">
          <video
            className="w-full aspect-video"
            src={course.course_content.sections[0].chapters[0].video.url}
            controls
            ref={videoPlayer}
          ></video>
        </div>

        <div className="grid gap-16">
          <div className="grid gap-6">
            <div>
              <h1 className="text-2xl xl:text-3xl font-semibold mb-3">
                {course.title}
              </h1>
              <p className="xl:text-lg">
                {course.course_metadata.short_description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10">
                <Avatar user={course.owner} />
              </div>
              <p className="leading-none">{course.owner.name}</p>
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

          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 2xl:gap-6">
            <h2 className="sr-only">Additional Informations</h2>
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
                <span className="font-bold">
                  {course.course_metadata.rating}
                </span>
                <AiFillStar aria-hidden />
              </div>
              <span>Avg. Rating</span>
            </div>
          </section>

          <section>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center mb-6">
              <h2 className="text-xl xl:text-2xl font-semibold">
                Content of this course
              </h2>
              <p className="text-sm xl:text-base text-white/75">
                {numberOfSections} Sections • {numberOfVideos} Videos •{' '}
                {course.course_metadata.duration}
              </p>
            </div>
            <Accordion.Root type="single" defaultValue="0" collapsible>
              {/* Initially render only first 5 sections */}
              <ol>
                {course.course_content.sections
                  .filter((item, index) => index < 5)
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
                              'hover:bg-coachify-teal-700/25 data-[state=open]:bg-coachify-teal-700'
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
                                  hover:text-coachify-cyan-700 data-[active=true]:text-coachify-cyan-700"
                                      data-active={
                                        chapterIndex === activeChapter
                                      }
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

                                        setActiveChapter(chapterIndex);
                                      }}
                                    >
                                      <input
                                        id="video_src"
                                        type="hidden"
                                        value={chapter.video.url}
                                      />
                                      <span>
                                        {sectionIndex + 1}.{chapterIndex + 1}.
                                      </span>
                                      <div className="ml-1 flex-1 sm:flex sm:justify-between">
                                        <p>{chapter.title}</p>
                                        <p className="">
                                          {chapter.video.duration}
                                        </p>
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
                                      <p className="">
                                        {chapter.video.duration}
                                      </p>
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

              {!showAllSections &&
                course.course_content.sections.length > 5 && (
                  <div className="flex justify-center mt-4">
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
                  {course.course_content.sections
                    .filter((item, index) => index >= 5)
                    .map((section, sectionIndex) => (
                      <li key={section.id}>
                        <Accordion.Item
                          value={(sectionIndex + 6).toString()}
                          className="group"
                        >
                          <Accordion.Header>
                            <Accordion.Trigger
                              className={clsx(
                                'flex items-center justify-between w-full',
                                'p-2 sm:p-3 rounded-lg transition-200-out-quart',
                                'hover:bg-coachify-teal-700/25 data-[state=open]:bg-coachify-teal-700'
                              )}
                            >
                              <div className="flex items-center gap-2 sm:gap-4">
                                <FiLock />
                                <span>
                                  {sectionIndex + 6}. {section.title}
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
                                    {sectionIndex + 6}.{chapterIndex + 1}.
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

          <section>
            <h2 className="text-xl xl:text-2xl font-semibold mb-6">
              About this course
            </h2>
            <div>
              <div
                ref={collapsibleDescription}
                data-state={showFullDescription ? 'open' : 'closed'}
                id="collapsible-description"
                className={clsx(
                  'relative transition-200-out-quart overflow-hidden',
                  makeDescriptionCollapsible &&
                    'data-[state=open]:max-h-[var(--radix-collapsible-content-height)] data-[state=closed]:max-h-[448px]'
                )}
              >
                <div
                  className="grid gap-4 [&_a]:underline [&_li]:list-inside [&_ul]:list-disc [&_ol]:list-decimal"
                  dangerouslySetInnerHTML={{
                    __html: sanitizedCourseDescription,
                  }}
                ></div>
                {makeDescriptionCollapsible && (
                  <div
                    className={clsx(
                      'absolute bottom-0 w-full h-24 bg-gradient-to-b from-transparent to-coachify-teal-1000 transition-200-out-quart',
                      showFullDescription
                        ? 'opacity-0 invisible'
                        : 'opacity-100 visible'
                    )}
                  ></div>
                )}
              </div>
              {makeDescriptionCollapsible && !showFullDescription && (
                <div className="flex justify-center mt-4">
                  <Button
                    fill="ghost"
                    icon="icon-right"
                    onClick={() => setShowFullDescription(true)}
                    aria-controls="collapsible-description"
                    data-state={showFullDescription ? 'open' : 'closed'}
                  >
                    Show full description
                    <FiChevronDown />
                  </Button>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl xl:text-2xl font-semibold mb-6">
              Skills you will gain
            </h2>
            <ul className="flex align-top gap-3 flex-wrap">
              {course.course_metadata.skill_tags.map((tag) => (
                <li
                  key={tag}
                  className="px-6 py-3 border border-white/50 rounded-full text-sm leading-none"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl xl:text-2xl font-semibold mb-6">
              Meet your teacher
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10">
                <Avatar user={course.owner} />
              </div>
              <p className="leading-none">{course.owner.name}</p>
            </div>
            <div
              className="grid gap-4 [&_a]:underline [&_li]:list-inside [&_ul]:list-disc [&_ol]:list-decimal"
              dangerouslySetInnerHTML={{ __html: sanitizedCreatorDescription }}
            ></div>
          </section>

          <div>reviews</div>

          <div>more from creator</div>
        </div>
      </section>
    </>
  );
};
export default Course;
