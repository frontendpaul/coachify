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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(252px,1fr))] gap-4 md:gap-6 [&>:nth-child(n+9)]:hidden">
        {products.map((product, index) => (
          <ProductCard product={product} index={index} key={product.id} />
        ))}
      </div>
    </section>
  );
};
export default RecentlyAdded;
