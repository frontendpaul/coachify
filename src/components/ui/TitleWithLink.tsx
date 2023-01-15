import LinkWithChevron from './LinkWithChevron';

type Props = {
  title: string;
  linkText: string;
  href: string;
};

const TitleWithLink = ({ title, linkText, href }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-8 mb-6">
      <h2 className="text-2xl lg:text-3xl font-semibold">{title}</h2>
      <LinkWithChevron href={href} text={linkText} />
    </div>
  );
};
export default TitleWithLink;
