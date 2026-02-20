"use client";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="w-full max-w-sm">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Søg"
        className="
          w-full rounded-full border-gray-300
          px-4 py-2 text-sm border-3
          hover:border-(--contrast)/50 hover:outline-none hover:ring-4 hover:ring-(--contrast)/25
          focus:border-(--contrast)/90 focus:outline-none focus:ring-4 focus:ring-(--contrast)/30
          transition
        "
      />
    </div>
  );
};

export default SearchBar;
