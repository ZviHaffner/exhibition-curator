import { search } from "@/chicago-api";
import { VscEllipsis } from "react-icons/vsc";

const PaginationBar = ({
  paginationData,
  searchTerm,
  setArtworks,
  setLoading,
  setError,
}) => {
  function handleClick(e) {
    setError({});
    setLoading(true);
    search(searchTerm, e.target.value, 10)
      .then((res) => {
        setArtworks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  }

  return (
    <div className="text-sm w-fit mx-auto my-5 px-5 flex items-center gap-2 bg-white border border-gray-300 rounded-md shadow-equal">
      <button
        className="font-medium disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={handleClick}
        value={paginationData.current_page - 1}
        disabled={paginationData.current_page === 1}
      >
        {"< Previous"}
      </button>

      {paginationData.current_page !== 1 && (
        <>
          <button onClick={handleClick} value={1}>
            1
          </button>
          <VscEllipsis />
        </>
      )}
      <p className="py-2 px-4 font-bold border border-black">
        {paginationData.current_page}
      </p>
      {paginationData.current_page !== paginationData.total_pages && (
        <>
          <VscEllipsis />
          <button onClick={handleClick} value={paginationData.total_pages}>
            {paginationData.total_pages}
          </button>
        </>
      )}

      <button
        className="font-medium disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={handleClick}
        value={paginationData.current_page + 1}
        disabled={paginationData.current_page === paginationData.total_pages}
      >
        {"Next >"}
      </button>
    </div>
  );
};

export default PaginationBar;
