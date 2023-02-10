import { userContractsAtom } from '@components/Layout';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineTrophy } from 'react-icons/ai';
import { FiClock, FiImage, FiStar, FiUser } from 'react-icons/fi';
import { Product } from 'types/supabase';
import { isCourseOwnedByUser, toHumanReadableTime } from 'utils/helpers';
const CourseCard = ({
  course,
  index,
  isPriority = false,
}: {
  course: Product;
  index: number;
  isPriority?: boolean;
}) => {
  const [userContracts] = useAtom(userContractsAtom);
  const [isOwned, setIsOwned] = useState<boolean>(false);

  useEffect(() => {
    setIsOwned(isCourseOwnedByUser(userContracts, course.id as string));
  }, [userContracts, course.id, setIsOwned]);

  return (
    <li className="overflow-hidden">
      <Link
        href={'/course/' + course.id}
        className="group relative isolate flex aspect-video flex-col justify-between overflow-hidden rounded-xl bg-coachify-teal-1100"
      >
        <div className="absolute inset-0 -z-10">
          {course.metadata?.cover_img ? (
            <Image
              src={course.metadata?.cover_img}
              fill
              sizes="(max-width: 768px) 100vw, 452px"
              alt=""
              priority={isPriority}
              className="transition-200-out-quart brightness-50 group-hover:scale-105"
            />
          ) : (
            <div className="grid aspect-video place-items-center bg-coachify-teal-1200">
              <FiImage className="text-7xl text-coachify-teal-1100" />
            </div>
          )}
        </div>
        <div className="flex justify-between p-4 pb-0">
          <div className="flex items-center gap-2 rounded-full bg-coachify-teal-1300/50 py-2 px-3 text-sm leading-none backdrop-blur">
            <AiOutlineTrophy />
            <span>Rank {index + 1}</span>
          </div>
          <div className="rounded-full bg-coachify-teal-1300/50 py-2 px-3 text-sm leading-none backdrop-blur">
            {isOwned ? (
              <span className="text-green-600">Owned</span>
            ) : (
              <>
                {course.old_price && (
                  <span className="mr-2 text-xs leading-none text-white text-opacity-75 line-through">
                    {course.old_price.toString().replace(/\./g, ',') + ' €'}
                  </span>
                )}
                {course.free && 'Free'}
                {course.price &&
                  course.price.toString().replace(/\./g, ',') + ' €'}
              </>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-1 font-semibold md:mb-2 md:text-lg">
            {course.metadata?.title}
          </h3>
          <p className="mb-3 text-sm leading-none text-white text-opacity-75 md:mb-4">
            by {course.owner?.name}
          </p>
          <div className="flex gap-8 text-sm leading-none md:gap-10">
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
      </Link>
    </li>
  );
};
export default CourseCard;
