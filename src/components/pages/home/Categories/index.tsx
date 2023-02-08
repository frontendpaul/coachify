import TitleWithLink from '@components/ui/TitleWithLink';
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CategoryList from './CategoryList';

const Categories = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // TODO: improve typing
  const [categories, setCategories] = useState<any>(null);

  const supabase = useSupabaseClient();

  const fetchCourses = async () => {
    setIsLoading(true);

    const { data: categories, error } = await supabase.from('category').select(
      `
        id,
        name,
        cover_img
        `
    );

    if (error) console.log(error);

    // console.log(categories);
    setCategories(categories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="pl-4 md:pl-6">
      <TitleWithLink
        title="Most Popular Categories"
        linkText="Browse all courses"
        href="/browse"
      />
      <CategoryList isLoading={isLoading} categories={categories} />
    </section>
  );
};
export default Categories;
