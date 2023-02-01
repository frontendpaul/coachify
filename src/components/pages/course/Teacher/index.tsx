import Avatar from '@components/ui/Avatar';
import SectionTitle from '@components/ui/SectionTitle';
import { Creator } from 'server/courses';
import { sanitizeText } from 'utils/helpers';

const Teacher = ({ owner }: { owner: Creator }) => {
  const sanitizedCreatorDescription = sanitizeText(owner.description as string);

  return (
    <section>
      <div className="grid gap-6">
        <SectionTitle>Meet your teacher</SectionTitle>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10">
            <Avatar user={owner} />
          </div>
          <p className="leading-none">{owner.name}</p>
        </div>
        <div
          className="grid gap-4 text-coachify-gray-300 [&_a]:underline [&_li]:list-inside [&_ul]:list-disc [&_ol]:list-decimal"
          dangerouslySetInnerHTML={{
            __html: sanitizedCreatorDescription,
          }}
        ></div>
      </div>
    </section>
  );
};
export default Teacher;
