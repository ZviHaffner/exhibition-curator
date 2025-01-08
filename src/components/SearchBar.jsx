import { search } from "@/chicago-api";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ setArtworks, setLoading }) => {
  const [searchInput, setSearchInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    search(searchInput).then((res) => {
      setArtworks(res.data);
      setLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-5 my-5 p-1 bg-white border border-gray-300 rounded-full shadow-equal shadow-gray-400">
        <CiSearch className="text-3xl text-gray-500" />
        <input
          className="grow rounded-r-full focus:outline-none"
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search Thousands of Artworks"
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
