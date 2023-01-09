import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiStar, FiUser } from 'react-icons/fi';
import { Product } from '../../server/products';
const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  return (
    <Link
      href={'/courses/' + product.id}
      className="group flex flex-col rounded-xl bg-coachify-teal-800 relative isolate overflow-hidden"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <Image
          src={product.coverImage}
          fill
          alt=""
          sizes="640px"
          priority
          className="brightness-50 transition-200-out-quart group-hover:scale-105"
        />
        <div className="absolute z-10 bottom-0 w-full flex justify-between leading-none text-sm p-3 md:p-4 bg-coachify-teal-1000 bg-opacity-50 backdrop-blur">
          <div className="flex items-center gap-2">
            <FiStar />
            {product.rating}
          </div>
          <div className="flex items-center gap-2">
            <FiUser />
            {product.participants}
          </div>
          <div className="flex items-center gap-2">
            <FiClock />
            {product.duration}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-3 pt-2 md:p-4 md:pt-3">
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <p className="leading-none mb-3 text-white text-opacity-75 text-sm">
          by {product.creator}
        </p>
        <p className="mt-auto">
          {product.price
            ? product.price.toString().replace(/\./g, ',') + ' €'
            : 'Free'}
          {product.oldPrice && (
            <span className="ml-2 text-sm text-white text-opacity-75 line-through">
              {product.oldPrice.toString().replace(/\./g, ',') + ' €'}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};
export default ProductCard;
