import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const search = () => {
    console.log('search');
  };
  return (
    <div className="flex items-center gap-6 flex-1 px-3 py-2 max-w-lg rounded-full border border-white border-opacity-40 transition-200-out-quart focus-within:border-opacity-100">
      <button onClick={() => search()}>
        <FiSearch />
      </button>
      <input
        type="text"
        className="flex-1 bg-transparent placeholder:text-white placeholder:text-opacity-75 focus:outline-none"
        placeholder="Search for courses, topics, creators..."
      />
    </div>
  );
};
export default Search;
