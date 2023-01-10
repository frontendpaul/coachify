import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineTrophy } from 'react-icons/ai';
import { FiClock, FiStar, FiUser } from 'react-icons/fi';
import { Product } from '../../server/products';
const ProductCard = ({
  product,
  index,
  isPriority = false,
}: {
  product: Product;
  index: number;
  isPriority?: boolean;
}) => {
  return (
    <Link
      href={'/courses/' + product.id}
      className="group flex flex-col justify-between aspect-[16/10] rounded-xl bg-coachify-teal-900 relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={product.coverImage}
          fill
          alt=""
          sizes="640px"
          priority={isPriority}
          className="brightness-50 transition-200-out-quart group-hover:scale-105"
        />
      </div>
      <div className="flex justify-between p-3 md:p-4 pb-0">
        <div className="flex items-center gap-2 py-2 px-3 leading-none text-sm rounded-full bg-coachify-teal-1000 bg-opacity-50 backdrop-blur">
          <AiOutlineTrophy />
          <span>Rank {index + 1}</span>
        </div>
        <div className="py-2 px-3 leading-none text-sm rounded-full bg-coachify-teal-1000 bg-opacity-50 backdrop-blur">
          {product.oldPrice && (
            <span className="mr-2 text-xs text-white text-opacity-75 line-through">
              {product.oldPrice.toString().replace(/\./g, ',') + ' €'}
            </span>
          )}
          {product.price
            ? product.price.toString().replace(/\./g, ',') + ' €'
            : 'Free'}
        </div>
      </div>
      <div className="p-3 pt-2 md:p-4 md:pt-3">
        <h3 className="md:text-lg font-semibold mb-1">{product.name}</h3>
        <p className="leading-none mb-3 text-white text-opacity-75 text-sm">
          by {product.creator}
        </p>
        <div className="flex gap-8 md:gap-10 leading-none text-sm">
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
    </Link>
  );
};
export default ProductCard;
