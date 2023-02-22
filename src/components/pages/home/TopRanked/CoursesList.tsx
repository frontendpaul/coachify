import { Contract, Product } from 'types/supabase';
import CourseCard from './CourseCard';
import Loader from './Loader';
import { useDraggable } from 'react-use-draggable-scroll';
import { useRef } from 'react';
import useUserContracts from 'hooks/useUserContracts';
import { useUser } from '@supabase/auth-helpers-react';

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

  const user = useUser();
  const { contracts } = useUserContracts(user?.id as string);

  return (
    <ol
      ref={sliderRef}
      {...events}
      className="scrollbar-hide grid auto-cols-[min(452px,95%)] grid-flow-col
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
              contracts={contracts as Contract[]}
            />
          ) : (
            <CourseCard
              course={course}
              index={index}
              key={course.id}
              contracts={contracts as Contract[]}
            />
          )
        )
      )}
    </ol>
  );
};
export default CoursesList;
