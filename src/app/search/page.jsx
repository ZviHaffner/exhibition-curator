"use client";

import ArtworkCard from "@/components/ArtworkCard";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

const Search = () => {
  const [artworks, setArtworks] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-2/3 mx-auto">
      <SearchBar setArtworks={setArtworks} setLoading={setLoading} />
      {loading && <p>Loading...</p>}
      <ArtworkCard artworks={artworks} />
    </div>
  );
};

export default Search;
