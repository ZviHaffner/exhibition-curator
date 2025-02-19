"use client";

import { useContext } from "react";
import Link from "next/link";
import { ExhibitionArtworksContext } from "@/contexts/ExhibitionArtworksProvider";
import ExhibitionCard from "@/components/ExhibitionCard";

const Exhibition = () => {
  const { exhibitionArtworks, setExhibitionArtworks } = useContext(
    ExhibitionArtworksContext
  );

  return (
    <div className="w-11/12 md:w-2/3 mx-auto text-center">
      <h1 className="my-5 text-4xl font-serif">Exhibitions</h1>
      {Object.keys(exhibitionArtworks).length ? (
        Object.keys(exhibitionArtworks).map((exhibitionName) => {
          return (
            <ExhibitionCard
              key={exhibitionName}
              exhibitionName={exhibitionName}
            />
          );
        })
      ) : (
        <div>
          <p>No Exhibitions Created...</p>
          <br />
          <p>
            Head to the{" "}
            <Link
              href="/artworks"
              className="hover:text-gray-600 hover:underline"
            >
              Gallery Explorer
            </Link>{" "}
            to Start Creating Curated Exhibitions
          </p>
        </div>
      )}
    </div>
  );
};

export default Exhibition;
