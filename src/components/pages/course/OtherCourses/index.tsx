import CourseCard from '@components/pages/home/RecentlyAdded/CourseCard';
import Button from '@components/ui/Button';
import SectionTitle from '@components/ui/SectionTitle';
import clsx from 'clsx';
import Link from 'next/link';
import { Course } from 'server/courses';

type Props = {
  ownerName: string;
  courses: Course[];
};

const OtherCourses = ({ ownerName, courses }: Props) => {
  const moreThan3 = courses.length > 3;
  return (
    <section>
      <div className="grid gap-6">
        <SectionTitle>
          Other courses by{' '}
          <Link href="/" className="underline">
            {ownerName}
          </Link>
        </SectionTitle>

        {courses.length === 0 ? (
          <p>This creator has no other courses yet.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className={clsx(
                    'flex',
                    moreThan3 && 'last:hidden sm:last:flex 2xl:last:hidden'
                  )}
                >
                  <CourseCard course={course} />
                </li>
              ))}
            </ul>
            {moreThan3 && (
              <Button fill="outline" className="place-self-start">
                Show all courses
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};
export default OtherCourses;
