import TitleWithLink from '@components/ui/TitleWithLink';
import { getProducts } from '../../server/products';
import ProductCard from './ProductCard';

const RecentlyAdded = () => {
  const products = getProducts().slice(0, 16);

  return (
    <section className="px-4 md:px-6">
      <TitleWithLink
        title="Recently Added"
        linkText="Browse all courses"
        href="/browse"
      />
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(252px,1fr))] gap-x-4 md:gap-x-6 overflow-hidden 
        auto-rows-[0] grid-rows-[repeat(4,auto)] xl:grid-rows-[repeat(3,auto)] 2xl:grid-rows-[repeat(2,auto)]
        [&>*]:mb-4 [&>*]:md:!mb-6 -mb-4 md:-mb-6"
      >
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};
export default RecentlyAdded;
