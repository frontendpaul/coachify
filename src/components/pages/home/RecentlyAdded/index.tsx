import TitleWithLink from '@components/ui/TitleWithLink';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Product } from 'types/supabase';
import CourseCard from './CourseCard';
import Loader from './Loader';

const RecentlyAdded = () => {
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
        free,
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
      .eq('state', 'published')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) console.log(error);

    // console.log(products);
    setCourses(products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="px-4 md:px-6">
      <TitleWithLink
        title="Recently Added"
        linkText="Browse all courses"
        href="/browse"
      />
      {!isLoading && (!courses || courses.length === 0) ? (
        <h3>No courses found</h3>
      ) : (
        <ul
          className="-mb-4 grid auto-rows-[0] grid-cols-[repeat(auto-fill,minmax(252px,1fr))] grid-rows-[repeat(4,auto)] gap-x-4 overflow-hidden 
        md:-mb-6 md:gap-x-6 [&>*]:md:!mb-6 xl:grid-rows-[repeat(3,auto)] 2xl:grid-rows-[repeat(2,auto)] [&>*]:mb-4"
        >
          {isLoading ? (
            <>
              <h3 className="sr-only">Loading</h3>
              <Loader />
            </>
          ) : (
            courses.map((course: any) => (
              <CourseCard course={course} key={course.id} />
            ))
          )}
        </ul>
      )}
    </section>
  );
};
export default RecentlyAdded;
