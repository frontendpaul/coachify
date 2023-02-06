import SectionTitle from '@components/ui/SectionTitle';
import { sanitizeText } from 'utils/helpers';

const About = ({ description }: { description: string }) => {
  const sanitizedCourseDescription = sanitizeText(description);

  return (
    <section className="mx-auto grid gap-6 lg:max-w-3xl">
      <SectionTitle>Chapter description</SectionTitle>
      <div
        className="grid gap-4 text-coachify-gray-300 [&_a]:underline [&_li]:list-inside [&_ul]:list-disc [&_ol]:list-decimal"
        dangerouslySetInnerHTML={{
          __html: sanitizedCourseDescription,
        }}
      ></div>
    </section>
  );
};
export default About;
