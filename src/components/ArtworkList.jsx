import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import ArtworkCard from "@/components/ArtworkCard";
import PaginationBar from "@/components/PaginationBar";
import FiltersChicago from "@/components/FiltersChicago";
import FiltersCleveland from "@/components/FiltersCleveland";
import { BsSliders } from "react-icons/bs";
import { FiX } from "react-icons/fi";

const ArtworkList = ({ artworks, error, isFiltered }) => {
  const [showFilters, setShowFilters] = useState(false);
  const { apiSource } = useParams();
  const searchParams = useSearchParams();

  function renderFilters() {
    if (apiSource === "chicago") {
      return <FiltersChicago />;
    }
    if (apiSource === "cleveland") {
      return <FiltersCleveland />;
    }
  }

  function renderResultsCount() {
    let middleKey;
    if (apiSource === "chicago") {
      middleKey = "pagination";
    }
    if (apiSource === "cleveland") {
      middleKey = "info";
    }
    return artworks[middleKey].total;
  }

  if (artworks.data?.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold font-serif">404</h2>
        <br />
        <p>{`No Artworks Found for Search '${searchParams.get("q")}'${
          isFiltered ? " or your Chosen Filters" : ""
        }`}</p>
        <Link href={`/artworks/${apiSource}`}>
          <button className="my-4 mx-auto py-2 px-3 font-semibold bg-white border rounded-sm hover:bg-gray-100">
            Restart Search
          </button>
        </Link>
      </div>
    );
  } else if (Object.keys(error).length) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-bold">{error.status}</h2>
        <p>{error.error}</p>
        <p>{error.detail}</p>
      </div>
    );
  } else if (artworks.data?.length > 0) {
    return (
      <>
        <div className="w-11/12 mx-auto">
          <button
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            {showFilters ? (
              <div className="flex items-center gap-1">
                <FiX size={16} />
                <p>Hide Filters</p>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <BsSliders size={16} />
                <p>Show Filters</p>
              </div>
            )}
          </button>
          <hr className="my-4" />
        </div>
        <div
          className={`${
            showFilters
              ? "w-11/12 mx-auto"
              : "w-11/12 md:w-4/5 lg:w-2/3 mx-auto"
          }`}
        >
          <div className="md:flex">
            {showFilters && renderFilters()}
            <div className="flex-1">
              <p className="text-center text-sm">
                {renderResultsCount()} Results
              </p>
              {artworks.data?.length > 0 &&
                artworks.data.map((artwork) => {
                  return (
                    <ArtworkCard
                      key={artwork.id}
                      artworks={artworks}
                      artwork={artwork}
                    />
                  );
                })}
              <PaginationBar
                paginationData={artworks.pagination || artworks.info}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default ArtworkList;
