import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
};

const SectionTitle = ({ className, children }: Props) => {
  return (
    <h2 className={clsx('text-xl xl:text-2xl font-semibold', className)}>
      {children}
    </h2>
  );
};
export default SectionTitle;
