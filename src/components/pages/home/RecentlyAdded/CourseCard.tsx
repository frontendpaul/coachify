import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiStar, FiUser } from 'react-icons/fi';
import { Course } from 'server/courses';
import { toHumanReadableTime } from 'utils/helpers';
const CourseCard = ({ course }: { course: any }) => {
  return (
    <li>
      <Link
        href={'/course/' + course.id}
        className="group relative isolate flex flex-col overflow-hidden rounded-xl bg-coachify-teal-1100"
      >
        <div className="relative overflow-hidden">
          <Image
            src={course.metadata?.cover_img}
            width={640}
            height={360}
            alt=""
            className="transition-200-out-quart group-hover:scale-105"
          />
          <div className="absolute bottom-0 z-10 flex w-full justify-between bg-coachify-teal-1300/50 px-4 py-3 text-sm leading-none backdrop-blur">
            <div className="flex items-center gap-2">
              <FiStar />
              {course.metadata?.rating}
            </div>
            <div className="flex items-center gap-2">
              <FiUser />
              {course.metadata?.participants}
            </div>
            <div className="flex items-center gap-2">
              <FiClock />
              {toHumanReadableTime(course.metadata?.duration)}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4 pt-3">
          <h3 className="mb-2 font-semibold">{course.metadata?.title}</h3>
          <p className="mb-3 text-sm leading-none text-white text-opacity-75">
            by {course.owner.name}
          </p>
          <p className="mt-auto">
            {course.price
              ? course.price.toString().replace(/\./g, ',') + ' €'
              : 'Free'}
            {course.old_price && (
              <s className="ml-2 text-sm text-white text-opacity-75 line-through">
                {course.old_price.toString().replace(/\./g, ',') + ' €'}
              </s>
            )}
          </p>
        </div>
      </Link>
    </li>
  );
};
export default CourseCard;
