"use client";

import { useEffect, useState } from "react";
import ArtworkList from "@/components/ArtworkList";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ApiSelector from "@/components/ApiSelector";
import FiltersChicago from "@/components/FiltersChicago";
import FiltersCleveland from "@/components/FiltersCleveland";
import { BsSliders } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const [selectedApi, setSelectedApi] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [artworks, setArtworks] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const source = searchParams.get("source") || "";
    setSearchTerm(q);
    setSelectedApi(source);
  }, [searchParams]);

  function renderFilters() {
    if (selectedApi === "artInstChicago") {
      return (
        <FiltersChicago
          searchTerm={searchTerm}
          setArtworks={setArtworks}
          setLoading={setLoading}
          setError={setError}
        />
      );
    }
    if (selectedApi === "clevelandMuseumArt") {
      return (
        <FiltersCleveland
          searchTerm={searchTerm}
          setArtworks={setArtworks}
          setLoading={setLoading}
          setError={setError}
        />
      );
    }
  }

  return (
    <div>
      {selectedApi ? (
        <>
          <SearchBar
            selectedApi={selectedApi}
            setSelectedApi={setSelectedApi}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setArtworks={setArtworks}
            setLoading={setLoading}
            setError={setError}
          />

          {loading ? (
            <LoadingSpinner />
          ) : Object.keys(error).length ? (
            <div className="text-center">
              <h2 className="text-lg font-bold">{error.status}</h2>
              <p>{error.error}</p>
              <p>{error.detail}</p>
            </div>
          ) : artworks.data?.length === 0 ? (
            setError({
              status: 404,
              detail: "No Artworks Found. Please Try a Different Search Term.",
            })
          ) : artworks.data?.length > 0 ? (
            <div
              className={`${
                showFilters ? "w-11/12 mx-auto" : "w-11/12 md:w-2/3 mx-auto"
              }`}
            >
              <button
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
              >
                {showFilters ? (
                  <div className="flex items-center gap-2 text-sm">
                    <FiX size={24} />
                    <p>Hide Filters</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    <BsSliders size={24} />
                    <p>Show Filters</p>
                  </div>
                )}
              </button>
              <div className="md:flex">
                {showFilters && renderFilters()}
                <ArtworkList
                  selectedApi={selectedApi}
                  searchTerm={searchTerm}
                  artworks={artworks}
                  setArtworks={setArtworks}
                  setLoading={setLoading}
                  setError={setError}
                />
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <ApiSelector
          setSelectedApi={setSelectedApi}
          setArtworks={setArtworks}
        />
      )}
    </div>
  );
};

export default Search;
