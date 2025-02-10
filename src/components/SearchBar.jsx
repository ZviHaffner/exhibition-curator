import { searchChicagoArtworks, searchClevelandArtworks } from "@/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({
  selectedApi,
  setSelectedApi,
  searchTerm,
  setSearchTerm,
  setArtworks,
  setLoading,
  setError,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (searchTerm) {
      handleSubmit()
    }
  }, [])
  

  function handleSubmit(e) {
    if (e) e.preventDefault();
    router.push(`?q=${searchTerm}&source=${selectedApi}`)
    setError({});
    setLoading(true);
    if (selectedApi === "artInstChicago") {
      searchChicagoArtworks(searchTerm)
        .then((res) => {
          setArtworks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
        });
    }
    if (selectedApi === "clevelandMuseumArt") {
      searchClevelandArtworks(searchTerm, 0, 10)
        .then((res) => {
          setArtworks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError({
            status: err.response.status,
            detail: err.response.data.detail[0].msg,
          });
        });
    }
  }

  function renderSelectedApi() {
    let selectedApiText;
    if (selectedApi === "artInstChicago") {
      selectedApiText = "Art Institute of Chicago";
    }
    if (selectedApi === "clevelandMuseumArt") {
      selectedApiText = "Cleveland Museum of Art";
    }
    return selectedApiText;
  }

  return (
    <search className="my-4">
      <form onSubmit={handleSubmit} className="w-11/12 md:w-1/2 mx-auto">
        <div className="flex gap-5 p-1 bg-white border border-gray-300 rounded-full shadow-equal">
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
      <div className="m-2 text-sm text-center">
        <p>Searching From the {renderSelectedApi()}</p>
        <button
          className="hover:text-gray-400"
          onClick={() => {
            setSelectedApi("");
          }}
        >
          Click Here to Change Source
        </button>
      </div>
    </search>
  );
};

export default SearchBar;
