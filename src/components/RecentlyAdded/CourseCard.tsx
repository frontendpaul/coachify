import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiStar, FiUser } from 'react-icons/fi';
import { Course } from '../../server/courses';
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Link
      href={'/courses/' + course.id}
      className="group flex flex-col rounded-xl bg-coachify-teal-800 relative isolate overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <Image
          src={course.cover_image}
          width={640}
          height={360}
          alt=""
          className="transition-200-out-quart group-hover:scale-105"
        />
        <div className="absolute z-10 bottom-0 w-full flex justify-between leading-none text-sm px-4 py-3 bg-coachify-teal-1000/50 backdrop-blur">
          <div className="flex items-center gap-2">
            <FiStar />
            {course.course_metadata.rating}
          </div>
          <div className="flex items-center gap-2">
            <FiUser />
            {course.course_metadata.participants}
          </div>
          <div className="flex items-center gap-2">
            <FiClock />
            {course.course_metadata.duration}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 pt-3 md:p-4 md:pt-3">
        <h3 className="font-semibold mb-2">{course.title}</h3>
        <p className="leading-none mb-3 text-white text-opacity-75 text-sm">
          by {course.owner}
        </p>
        <p className="mt-auto">
          {course.price
            ? course.price.toString().replace(/\./g, ',') + ' €'
            : 'Free'}
          {course.old_price && (
            <span className="ml-2 text-sm text-white text-opacity-75 line-through">
              {course.old_price.toString().replace(/\./g, ',') + ' €'}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};
export default CourseCard;
