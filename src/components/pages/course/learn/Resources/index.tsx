import SectionTitle from '@components/ui/SectionTitle';
import { FiDownload } from 'react-icons/fi';
import { Resource } from 'server/courses';

const Resources = ({ resources }: { resources: Resource[] }) => {
  return (
    <section className="grid gap-6 md:max-w-xl">
      <SectionTitle>Files attached to this chapter</SectionTitle>
      <ul className="grid gap-1">
        {resources.map((file) => (
          <li key={file.id}>
            <a
              href={file.src}
              download
              className="transition-200-out-quart flex items-center justify-between gap-2 rounded-lg bg-coachify-teal-1100/50 p-3 text-sm text-coachify-gray-200 hover:bg-coachify-teal-900 sm:gap-3 sm:py-[10px] sm:text-base"
            >
              <span className="line-clamp-1">{file.name}</span>
              <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                <span className="text-xs text-white/50">{file.size}</span>
                <FiDownload className="text-lg sm:text-xl" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Resources;
