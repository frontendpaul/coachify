import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

type Props = {
  title: string;
  linkText: string;
  href: string;
};

const TitleWithLink = ({ title, linkText, href }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-8 mb-6">
      <h2 className="text-2xl lg:text-3xl font-semibold">{title}</h2>
      <Link
        href={href}
        className="flex items-center gap-2 hover:gap-3 text-sm md:mb-0.5 transition-200-out-quart"
      >
        <span>{linkText}</span>
        <FiChevronRight />
      </Link>
    </div>
  );
};
export default TitleWithLink;
