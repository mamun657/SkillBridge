const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#6757F5]/40 focus:border-[#6757F5]"
        style={{
          boxShadow: '0 0 8px rgba(103, 87, 245, 0.4)',
          border: '2px solid #6757F5'
        }}
      />
      <svg
        className="absolute left-4 top-3.5 h-5 w-5 text-[#6757F5]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

export default SearchBar;

