"use client";

import { useState } from "react";
import ArtworkList from "@/components/ArtworkList";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ApiSelector from "@/components/ApiSelector";
import Filters from "@/components/Filters";

const Search = () => {
  const [selectedApi, setSelectedApi] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [artworks, setArtworks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  return (
    <div className="w-11/12 mx-auto">
      <ApiSelector setSelectedApi={setSelectedApi} setArtworks={setArtworks} />
      {selectedApi && (
        <>
          <SearchBar
            selectedApi={selectedApi}
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
            <div className="flex">
              <Filters
                searchTerm={searchTerm}
                setArtworks={setArtworks}
                setLoading={setLoading}
                setError={setError}
              />
              <ArtworkList
                selectedApi={selectedApi}
                searchTerm={searchTerm}
                artworks={artworks}
                setArtworks={setArtworks}
                setLoading={setLoading}
                setError={setError}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Search;
