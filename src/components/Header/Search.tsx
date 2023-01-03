import clsx from 'clsx';
import { FiSearch } from 'react-icons/fi';

const Search = ({ className }: { className?: string }) => {
  const search = () => {
    console.log('search');
  };
  return (
    <div
      className={clsx(
        className,
        'flex items-center gap-3 flex-1 pr-0 pl-3 max-w-lg rounded-full border border-white border-opacity-40 transition-200-out-quart focus-within:border-opacity-100'
      )}
    >
      <input
        type="text"
        className="flex-1 w-full bg-transparent placeholder:text-white placeholder:text-opacity-75 focus:outline-none"
        placeholder="Search for courses, topics, creators..."
      />
      <button
        aria-label="search-button"
        className="p-[10px] text-xl"
        onClick={() => search()}
      >
        <FiSearch />
      </button>
    </div>
  );
};
export default Search;
