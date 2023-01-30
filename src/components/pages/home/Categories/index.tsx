import TitleWithLink from '@components/ui/TitleWithLink';
import { getCategories } from 'server/categories';
import CategoryCard from './CategoryCard';
import { useDraggable } from 'react-use-draggable-scroll';
import { useRef } from 'react';

const Categories = () => {
  const sliderRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;

  const { events } = useDraggable(sliderRef);

  const categories = getCategories();

  const colors = [
    '#e63232',
    '#f3722c',
    '#f8961e',
    '#ffd043',
    '#7fc96b',
    '#43aa8b',
    '#277da1',
    '#3b498e',
    '#66418a',
  ];

  return (
    <section className="pl-4 md:pl-6">
      <TitleWithLink
        title="Most Popular Categories"
        linkText="Browse all courses"
        href="/browse"
      />
      <div
        ref={sliderRef}
        {...events}
        className="grid grid-flow-col 
        auto-cols-[min(200px,90%)]
        gap-4 md:gap-6 pr-4 md:pr-6 overflow-auto cursor-grab scrollbar-hide"
      >
        {categories.map((category, index) => (
          <CategoryCard
            category={category}
            color={colors[index]}
            key={category.id}
          />
        ))}
      </div>
    </section>
  );
};
export default Categories;
