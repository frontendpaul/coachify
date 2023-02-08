import { Product } from 'types/supabase';
import CourseCard from './CourseCard';
import Loader from './Loader';
import { useDraggable } from 'react-use-draggable-scroll';
import { useRef } from 'react';

const CoursesList = ({
  isLoading,
  courses,
}: {
  isLoading: boolean;
  courses: Product[];
}) => {
  const sliderRef = useRef<HTMLOListElement>(
    null
  ) as React.MutableRefObject<HTMLOListElement>;

  const { events } = useDraggable(sliderRef);

  return (
    <ol
      ref={sliderRef}
      {...events}
      className="scrollbar-hide grid auto-cols-[min(452px,90%)] grid-flow-col
        gap-4 overflow-auto pr-4 md:gap-6 md:pr-6 xl:auto-cols-[40%] 2xl:auto-cols-[min(452px,30%)]"
    >
      {isLoading ? (
        <Loader />
      ) : (
        courses.map((course: any, index: number) =>
          index < 4 ? (
            <CourseCard
              course={course}
              index={index}
              key={course.id}
              isPriority={true}
            />
          ) : (
            <CourseCard course={course} index={index} key={course.id} />
          )
        )
      )}
    </ol>
  );
};
export default CoursesList;
