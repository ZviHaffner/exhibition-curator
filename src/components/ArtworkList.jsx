import { useState } from "react";
import { useParams } from "next/navigation";
import ArtworkCard from "@/components/ArtworkCard";
import PaginationBar from "@/components/PaginationBar";
import FiltersChicago from "@/components/FiltersChicago";
import FiltersCleveland from "@/components/FiltersCleveland";
import { BsSliders } from "react-icons/bs";
import { FiX } from "react-icons/fi";

const ArtworkList = ({
  artworks,
  setArtworks,
  setLoading,
  error,
  setError,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const { apiSource } = useParams();

  function renderFilters() {
    if (apiSource === "chicago") {
      return (
        <FiltersChicago
          setArtworks={setArtworks}
          setLoading={setLoading}
          setError={setError}
        />
      );
    }
    if (apiSource === "cleveland") {
      return (
        <FiltersCleveland
          setArtworks={setArtworks}
          setLoading={setLoading}
          setError={setError}
        />
      );
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
    setError({
      status: 404,
      detail: "No Artworks Found. Please Try a Different Search Term.",
    });
  }

  if (Object.keys(error).length) {
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
            showFilters ? "w-11/12 mx-auto" : "w-11/12 md:w-2/3 mx-auto"
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
                setArtworks={setArtworks}
                setLoading={setLoading}
                setError={setError}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default ArtworkList;
