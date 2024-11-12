const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-full md:w-1/4 p-4">
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full border border-gray-300 rounded p-2"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
