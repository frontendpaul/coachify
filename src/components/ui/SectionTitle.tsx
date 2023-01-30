import { PropsWithChildren } from 'react';

const SectionTitle = (props: PropsWithChildren) => {
  return (
    <h2 className="text-xl xl:text-2xl font-semibold">{props.children}</h2>
  );
};
export default SectionTitle;
