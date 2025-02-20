"use client";

import { createContext, useEffect, useState } from "react";

export const ExhibitionArtworksContext = createContext();

export default function ExhibitionArtworksProvider({ children }) {
  const [exhibitionArtworks, setExhibitionArtworks] = useState({});

  useEffect(() => {
    const savedArtworks = JSON.parse(
      localStorage.getItem("exhibitionArtworks")
    );
    if (savedArtworks && Object.keys(savedArtworks).length) {
      setExhibitionArtworks(savedArtworks);
    }
  }, []);

  useEffect(() => {
    if (exhibitionArtworks) {
      localStorage.setItem(
        "exhibitionArtworks",
        JSON.stringify(exhibitionArtworks)
      );
    }
  }, [exhibitionArtworks]);

  return (
    <ExhibitionArtworksContext.Provider
      value={{ exhibitionArtworks, setExhibitionArtworks }}
    >
      {children}
    </ExhibitionArtworksContext.Provider>
  );
}
