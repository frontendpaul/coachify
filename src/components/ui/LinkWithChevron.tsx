import clsx from 'clsx';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

type Props = {
  href: string;
  text: string;
  className?: string;
};

const LinkWithChevron = ({ href, text, className }: Props) => {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-2 hover:gap-3 text-sm md:mb-0.5 transition-200-out-quart',
        className
      )}
    >
      <span>{text}</span>
      <FiChevronRight />
    </Link>
  );
};
export default LinkWithChevron;
