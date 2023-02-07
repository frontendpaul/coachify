import TitleWithLink from '@components/ui/TitleWithLink';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import CourseCard from './CourseCard';
import Loader from './Loader';

const TopRanked = () => {
  const [isMounted, setIsMounted] = useState(false);
  const sliderRef = useRef<HTMLOListElement>(
    null
  ) as React.MutableRefObject<HTMLOListElement>;

  const { events } = useDraggable(sliderRef, { isMounted: isMounted });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  // TODO: improve typing
  const [courses, setCourses] = useState<any>(null);

  const supabase = useSupabaseClient();

  const fetchCourses = async () => {
    setIsLoading(true);

    const { data: products, error } = await supabase
      .from('product')
      .select(
        `
        id,
        owner:user(
          name
        ),
        state,
        price,
        old_price,
        rank_score,
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
      .eq('state', 'published')
      .order('rank_score', { ascending: false })
      .limit(10);

    if (error) console.log(error);

    console.log(products);
    setCourses(products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (!courses || courses.length === 0) {
    return (
      <section className="px-4 md:px-6">
        <TitleWithLink
          title="Recently Added"
          linkText="Browse all courses"
          href="/browse"
        />
        <ol ref={sliderRef}>
          <li>
            <h3>No courses found</h3>
          </li>
        </ol>
      </section>
    );
  }

  return (
    <section className="pl-4 md:pl-6">
      <TitleWithLink
        title="Top Ranked Courses"
        linkText="Browse all top ranked courses"
        href="/browse"
      />
      <ol
        ref={sliderRef}
        {...events}
        className="scrollbar-hide grid 
        cursor-grab auto-cols-[min(452px,90%)] grid-flow-col
        gap-4 overflow-auto pr-4 md:gap-6 md:pr-6 xl:auto-cols-[40%] 2xl:auto-cols-[min(452px,30%)]"
      >
        {isLoading ? (
          <Loader />
        ) : (
          courses.map((course: any, index: number) =>
            index < 4 ? (
              <CourseCard
                course={course}
                index={index}
                key={course.id}
                isPriority={true}
              />
            ) : (
              <CourseCard course={course} index={index} key={course.id} />
            )
          )
        )}
      </ol>
    </section>
  );
};
export default TopRanked;
