import Link from 'next/link';
import { useRef } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useDraggable } from 'react-use-draggable-scroll';
import { getTopRankedProducts } from '../../server/products';
import ProductCard from './ProductCard';

const TopRanked = () => {
  const sliderRef = useRef<HTMLUListElement>(
    null
  ) as React.MutableRefObject<HTMLUListElement>;

  const { events } = useDraggable(sliderRef);

  const topRankedProducts = getTopRankedProducts().slice(0, 9);
  return (
    <section className="pl-4 md:pl-6">
      <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-8 mb-5">
        <h2 className="text-2xl lg:text-3xl font-semibold">
          Top Ranked Courses
        </h2>
        <Link
          href="/browse"
          className="flex items-center gap-2 text-sm md:mb-0.5 transition-200-out-quart hover:gap-3"
        >
          <span>Browse all top ranked courses</span>
          <FiChevronRight />
        </Link>
      </div>
      <ul
        ref={sliderRef}
        {...events}
        className="grid grid-flow-col 
        auto-cols-[min(452px,90%)] xl:auto-cols-[40%] 2xl:auto-cols-[min(452px,30%)]
        gap-4 md:gap-6 pr-4 md:pr-6 overflow-auto cursor-grab scrollbar-hide"
      >
        {topRankedProducts.map((product, index) => (
          <li key={product.id}>
            <Link href={'/courses/' + product.id}>
              <ProductCard product={product} index={index} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default TopRanked;
