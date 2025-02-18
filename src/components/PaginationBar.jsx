import { useParams, useRouter, useSearchParams } from "next/navigation";
import { VscEllipsis } from "react-icons/vsc";

const PaginationBar = ({
  paginationData
}) => {
  const { apiSource } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleClick(e) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", e.target.value);
    router.push(`?${params.toString()}`);
  }

  function getCurrentPage() {
    if (apiSource === "chicago") {
      return paginationData.current_page;
    }
    if (apiSource === "cleveland") {
      if (paginationData.parameters.skip === 0) {
        return 1;
      }
      return paginationData.parameters.skip / 10 + 1;
    }
  }

  function getTotalPages() {
    if (apiSource === "chicago") {
      return paginationData.total_pages;
    }
    if (apiSource === "cleveland") {
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
