import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiClock, FiImage, FiStar, FiUser } from 'react-icons/fi';
import { Contract, Product } from 'types/supabase';
import { isCourseOwnedByUser, toHumanReadableTime } from 'utils/helpers';

const CourseCard = ({
  course,
  className,
  contracts,
}: {
  course: Product;
  className?: string;
  contracts: Contract[];
}) => {
  const [isOwned, setIsOwned] = useState<boolean>(false);

  useEffect(() => {
    setIsOwned(isCourseOwnedByUser(contracts, course.id as string));
  }, [contracts, course.id, setIsOwned]);

  return (
    <li className={clsx('flex', className)}>
      <Link
        href={'/course/' + course.id}
        className="group relative isolate flex flex-1 flex-col overflow-hidden rounded-xl bg-coachify-teal-1100"
      >
        <div className="relative overflow-hidden">
          {course.metadata?.cover_img ? (
            <Image
              src={course.metadata?.cover_img}
              width={640}
              height={360}
              alt=""
              className="transition-200-out-quart group-hover:scale-105"
            />
          ) : (
            <div className="grid aspect-video place-items-center bg-coachify-teal-1200">
              <FiImage className="text-7xl text-coachify-teal-1100" />
            </div>
          )}
          <div className="absolute bottom-0 z-10 flex w-full justify-between bg-coachify-teal-1300/50 px-4 py-3 text-sm leading-none backdrop-blur">
            <div className="flex items-center gap-2">
              <FiStar />
              {course.metadata?.rating ? course.metadata?.rating : '-'}
            </div>
            <div className="flex items-center gap-2">
              <FiUser />
              {course.metadata?.participants
                ? course.metadata?.participants
                : '-'}
            </div>
            <div className="flex items-center gap-2">
              <FiClock />
              {course.metadata?.duration
                ? toHumanReadableTime(course.metadata?.duration)
                : '-'}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4 pt-3">
          <h3 className="mb-2 font-semibold">{course.metadata?.title}</h3>
          <p className="mb-3 text-sm leading-none text-white text-opacity-75">
            by {course.owner?.name}
          </p>
          <p className="mt-auto">
            {isOwned ? (
              <span className="text-green-600">Owned</span>
            ) : (
              <>
                {course.free && 'Free'}
                {course.price &&
                  course.price.toString().replace(/\./g, ',') + ' €'}
                {course.old_price && (
                  <s className="ml-2 text-sm text-white text-opacity-75 line-through">
                    {course.old_price.toString().replace(/\./g, ',') + ' €'}
                  </s>
                )}
              </>
            )}
          </p>
        </div>
      </Link>
    </li>
  );
};
export default CourseCard;
