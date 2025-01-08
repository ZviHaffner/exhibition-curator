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
      {artworks.data?.length > 0 &&
        artworks.data.map((artwork) => {
          return <ArtworkCard key={artwork.id} artworks={artworks} artwork={artwork} />;
        })}
    </div>
  );
};

export default Search;
