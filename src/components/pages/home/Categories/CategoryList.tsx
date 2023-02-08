import { Category } from 'types/supabase';
import Loader from './Loader';
import { useDraggable } from 'react-use-draggable-scroll';
import { useRef } from 'react';
import CategoryCard from './CategoryCard';

const CategoryList = ({
  isLoading,
  categories,
}: {
  isLoading: boolean;
  categories: Category[];
}) => {
  const sliderRef = useRef<HTMLUListElement>(
    null
  ) as React.MutableRefObject<HTMLUListElement>;

  const { events } = useDraggable(sliderRef);

  return (
    <ul
      ref={sliderRef}
      {...events}
      className="scrollbar-hide grid 
    cursor-grab
    auto-cols-[min(200px,90%)] grid-flow-col gap-4 overflow-auto pr-4 md:gap-6 md:pr-6"
    >
      {isLoading ? (
        <Loader />
      ) : (
        categories.map((category: Category, index: number) => (
          <CategoryCard category={category} key={category.id} />
        ))
      )}
    </ul>
  );
};
export default CategoryList;
