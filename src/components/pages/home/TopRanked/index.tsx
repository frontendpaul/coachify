import TitleWithLink from '@components/ui/TitleWithLink';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import CoursesList from './CoursesList';

const TopRanked = () => {
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

    setCourses(products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="pl-4 md:pl-6">
      <TitleWithLink
        title="Top Ranked Courses"
        linkText="Browse all top ranked courses"
        href="/browse"
      />
      {!isLoading && (!courses || courses.length === 0) ? (
        <h3>No courses found</h3>
      ) : (
        <CoursesList isLoading={isLoading} courses={courses} />
      )}
    </section>
  );
};
export default TopRanked;
