import SectionTitle from '@components/ui/SectionTitle';

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <section>
      <div className="grid gap-6">
        <SectionTitle>Skills you will gain</SectionTitle>
        <ul className="flex align-top gap-3 flex-wrap">
          {tags.map((tag) => (
            <li
              key={tag}
              className="px-6 py-3 border border-white/50 rounded-full text-sm leading-none"
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
