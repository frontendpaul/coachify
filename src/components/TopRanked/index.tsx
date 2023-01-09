import TitleWithLink from '@components/ui/TitleWithLink';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import { getTopRankedProducts } from '../../server/products';
import ProductCard from './ProductCard';

const TopRanked = () => {
  const sliderRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;

  const { events } = useDraggable(sliderRef);

  const topRankedProducts = getTopRankedProducts().slice(0, 9);
  return (
    <section className="pl-4 md:pl-6">
      <TitleWithLink
        title="Top Ranked Courses"
        linkText="Browse all top ranked courses"
        href="/browse"
      />
      <div
        ref={sliderRef}
        {...events}
        className="grid grid-flow-col 
        auto-cols-[min(452px,90%)] xl:auto-cols-[40%] 2xl:auto-cols-[min(452px,30%)]
        gap-4 md:gap-6 pr-4 md:pr-6 overflow-auto cursor-grab scrollbar-hide"
      >
        {topRankedProducts.map((product, index) => (
          <ProductCard product={product} index={index} key={product.id} />
        ))}
      </div>
    </section>
  );
};
export default TopRanked;
