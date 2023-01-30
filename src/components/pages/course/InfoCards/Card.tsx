import { PropsWithChildren } from 'react';

const Card = (props: PropsWithChildren) => {
  return (
    <div className="grid justify-items-center gap-2 p-4 2xl:p-6 bg-coachify-teal-1000 rounded-lg">
      {props.children}
    </div>
  );
};
export default Card;
