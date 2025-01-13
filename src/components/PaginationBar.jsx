import { searchChicagoArtworks, searchClevelandArtworks } from "@/api";
import { VscEllipsis } from "react-icons/vsc";

const PaginationBar = ({
  selectedApi,
  paginationData,
  searchTerm,
  setArtworks,
  setLoading,
  setError,
}) => {
  function handleClick(e) {
    setError({});
    setLoading(true);
    if (selectedApi === "artInstChicago") {
      searchChicagoArtworks(searchTerm, e.target.value, 10)
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
      searchClevelandArtworks(searchTerm, (e.target.value - 1) * 10, 10)
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

  function getCurrentPage() {
    if (selectedApi === "artInstChicago") {
      return paginationData.current_page;
    }
    if (selectedApi === "clevelandMuseumArt") {
      if (paginationData.parameters.skip === 0) {
        return 1;
      }
      return paginationData.parameters.skip / 10 + 1;
    }
  }

  function getTotalPages() {
    if (selectedApi === "artInstChicago") {
      return paginationData.total_pages;
    }
    if (selectedApi === "clevelandMuseumArt") {
      return Math.ceil(paginationData.total / paginationData.parameters.limit);
    }
  }

  return (
    <div className="text-sm w-fit mx-auto my-5 px-5 flex items-center gap-2 bg-white border border-gray-300 rounded-md shadow-equal">
      <button
        className="font-medium disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={handleClick}
        value={getCurrentPage() - 1}
        disabled={getCurrentPage() === 1}
      >
        {"< Previous"}
      </button>

      {getCurrentPage() !== 1 && (
        <>
          <button onClick={handleClick} value={1}>
            1
          </button>
          <VscEllipsis />
        </>
      )}
      <p className="py-2 px-4 font-bold border border-black">
        {getCurrentPage()}
      </p>
      {getCurrentPage() !== getTotalPages() && (
        <>
          <VscEllipsis />
          <button onClick={handleClick} value={getTotalPages()}>
            {getTotalPages()}
          </button>
        </>
      )}

      <button
        className="font-medium disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={handleClick}
        value={getCurrentPage() + 1}
        disabled={getCurrentPage() === getTotalPages()}
      >
        {"Next >"}
      </button>
    </div>
  );
};

export default PaginationBar;
