import { search } from "@/chicago-api";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  setArtworks,
  setLoading,
  setError,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    setError({});
    setLoading(true);
    search(searchTerm)
      .then((res) => {
        setArtworks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false)
        setError(err.response.data);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-5 my-5 p-1 bg-white border border-gray-300 rounded-full shadow-equal">
        <CiSearch className="text-3xl text-gray-500" />
        <input
          className="grow rounded-r-full focus:outline-none"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search Thousands of Artworks"
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
