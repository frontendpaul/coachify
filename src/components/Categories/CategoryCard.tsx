import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from 'server/categories';

const CategoryCard = ({
  category,
  color,
}: {
  category: Category;
  color: string;
}) => {
  return (
    <Link
      href={'/browse'}
      className="group relative flex flex-col aspect-square isolate rounded-lg overflow-hidden"
    >
      <Image
        src={category.coverImage}
        alt=""
        fill
        sizes="300px"
        className="absolute inset-0 -z-10 brightness-50"
      />
      <p className="mt-auto p-4 text-xl transition-200-out-quart group-hover:pb-5">
        {category.name}
      </p>
      <div
        className={'h-2 transition-200-out-quart group-hover:h-3'}
        style={{ backgroundColor: `${color}` }}
      ></div>
    </Link>
  );
};
export default CategoryCard;
