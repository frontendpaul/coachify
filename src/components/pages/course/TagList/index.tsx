import SectionTitle from '@components/ui/SectionTitle';

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <section>
      <div className="grid gap-6">
        <SectionTitle>Skills you will gain</SectionTitle>
        <ul className="flex flex-wrap gap-3 align-top">
          {tags &&
            tags.length &&
            tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/50 px-6 py-3 text-sm leading-none"
              >
                {tag}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
export default TagList;
