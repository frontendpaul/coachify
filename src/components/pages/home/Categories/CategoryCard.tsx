import Image from 'next/image';
import Link from 'next/link';
import { Category } from 'types/supabase';

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <li className="overflow-hidden">
      <Link
        href={'/browse'}
        className="group relative isolate flex aspect-square flex-col overflow-hidden rounded-lg"
      >
        <Image
          src={category.cover_img as string}
          alt=""
          fill
          sizes="300px"
          className="absolute inset-0 -z-10 brightness-50"
        />
        <p className="transition-200-out-quart mt-auto p-4 text-xl group-hover:pb-5">
          {category.name}
        </p>
      </Link>
    </li>
  );
};
export default CategoryCard;
