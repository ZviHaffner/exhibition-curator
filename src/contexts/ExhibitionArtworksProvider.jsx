"use client";

import { createContext, useState } from "react";

export const ExhibitionArtworksContext = createContext();

export default function ExhibitionArtworksProvider({ children }) {
  const [exhibitionArtworks, setExhibitionArtworks] = useState([]);

  return (
    <ExhibitionArtworksContext.Provider
      value={{ exhibitionArtworks, setExhibitionArtworks }}
    >
      {children}
    </ExhibitionArtworksContext.Provider>
  );
}
