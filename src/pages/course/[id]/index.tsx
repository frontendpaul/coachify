import Link from 'next/link';
import { useRouter } from 'next/router';
import { Review } from 'types/supabase';
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Overview from '@components/pages/course/Overview';
import InfoCards from '@components/pages/course/InfoCards';
import ContentOverview from '@components/pages/course/ContentOverview';
import Description from '@components/pages/course/Description';
import TagList from '@components/pages/course/TagList';
import Teacher from '@components/pages/course/Teacher';
import Reviews from '@components/pages/course/Reviews';
import OtherCourses from '@components/pages/course/OtherCourses';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Card from '@components/pages/course/InfoCards/Card';
import Loader from '@components/pages/course/learn/Loader';
import { getAverageRating } from 'utils/helpers';

const Course = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  // TODO: improve typing
  const [course, setCourse] = useState<any>(null);

  const supabase = useSupabaseClient();

  const fetchCourse = async () => {
    setIsLoading(true);

    const { data: product, error } = await supabase
      .from('product')
      .select(
        `
        id,
        owner:user(
          id,
          name,
          avatar_url,
          description
        ),
        state,
        free,
        price,
        old_price,
        category(name),
        metadata:product_metadata(*),
        reviews_metadata(
          number_of_reviews,
          ratings
        ),
        content:product_content(
          sections:section(
            *,
            chapters:chapter(
              *,
              video:video(*),
              resources:resource(*)
            )
          )
        ),
        created_at,
        updated_at
      `
      )
      .eq('id', id)
      .single();

    if (error) console.log(error);

    setCourse(product);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const [playlist, setPlaylist] = useState<string[]>([]);
  useEffect(() => {
    if (course) {
      const chapters: string[] = [];
      course.content?.sections?.forEach((section: any) =>
        section.chapters?.forEach((chapter: any) => chapters.push(chapter.id))
      );
      setPlaylist(chapters);
    }
  }, [course]);

  const [averageRating, setAverageRating] = useState(0);
  useEffect(() => {
    if (course)
      setAverageRating(
        getAverageRating(
          course.reviews_metadata?.ratings || [0],
          course.reviews_metadata?.number_of_reviews || 0
        )
      );
  }, [course]);

  const videoPlayer = useRef<HTMLVideoElement>(null);

  const [moreCourses, setMoreCourses] = useState<any>(null);
  const [isLoadingMoreCourses, setIsLoadingMoreCourses] =
    useState<boolean>(true);

  const fetchCoursesByCreator = async (
    ownerId: string,
    currentCourseId: string
  ) => {
    setIsLoadingMoreCourses(true);

    const { data: products, error } = await supabase
      .from('product')
      .select(
        `
        id,
        owner:user!inner(
          id,
          name
        ),
        state,
        price,
        old_price,
        metadata:product_metadata(
          title,
          cover_img,
          rating,
          participants,
          duration
        ),
        created_at
        `
      )
      .eq('owner.id', ownerId)
      .neq('id', currentCourseId)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) console.log(error);

    setMoreCourses(products);
    setIsLoadingMoreCourses(false);
  };

  useEffect(() => {
    if (course?.owner?.id) {
      fetchCoursesByCreator(course.owner.id, course.id);
    }
  }, [course]);

  if (isLoading) {
    return <Loader />;
  }

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

  if (course.state !== 'published') {
    return (
      <>
        <Head>
          <title>This course has not been published yet.</title>
          <meta
            name="description"
            content="This course has not been published yet. Please come back later."
          />
        </Head>
        <div className="mt-20 grid place-items-center">
          <h1 className="text-semibold text-xl">
            This course has not been published yet.
          </h1>
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
        <title>{course.metadata?.title}</title>
        <meta name="description" content={course.metadata?.short_description} />
      </Head>

      <section
        className="mx-auto max-w-3xl py-6 px-4 md:px-6 xl:grid
      xl:max-w-7xl xl:grid-cols-[1fr,min(35%,400px)] xl:gap-6"
      >
        <div className="relative mb-6 block xl:order-2 xl:mb-0">
          <video
            className="sticky top-[90px] w-full"
            src={course.content?.sections[0]?.chapters[0]?.video?.src || ''}
            controls
            ref={videoPlayer}
          ></video>
        </div>

        <div className="grid gap-16">
          <Overview
            id={id}
            title={course.metadata?.title}
            short_description={course.metadata?.short_description}
            owner={course.owner}
            free={course.free}
            price={course.price}
            old_price={course.old_price}
            playlist={playlist}
          />

          <InfoCards
            level={course.metadata?.level}
            language={course.metadata?.language}
            participants={course.metadata?.participants}
            rating={averageRating}
          />

          <ContentOverview content={course.content} videoPlayer={videoPlayer} />

          <Description description={course.metadata?.description} />

          <TagList tags={course.metadata?.tags} />

          <Teacher owner={course.owner} />

          <Reviews
            productId={course.id}
            reviewsTotal={course.reviews_metadata?.number_of_reviews || 0}
            rating={averageRating}
          />

          <OtherCourses ownerName={course.owner.name} courses={moreCourses} />
        </div>
      </section>
    </>
  );
};
export default Course;
