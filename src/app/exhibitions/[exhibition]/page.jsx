"use client";

import { useContext } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ExhibitionArtworkCard from "@/components/ExhibitionArtworkCard";
import { ExhibitionArtworksContext } from "@/contexts/ExhibitionArtworksProvider";

const page = () => {
  const { exhibitionArtworks, setExhibitionArtworks } = useContext(
    ExhibitionArtworksContext
  );

  let { exhibition } = useParams();
  exhibition = decodeURIComponent(exhibition);

  return (
    <div className="w-11/12 md:w-2/3 mx-auto text-center">
      <h1 className="my-8 text-4xl font-serif">{exhibition}</h1>
      {exhibitionArtworks[exhibition]?.length ? (
        <>
          {exhibitionArtworks[exhibition]?.map((artwork) => {
            return (
              <ExhibitionArtworkCard
                key={artwork.id}
                artwork={artwork}
                exhibitionArtworks={exhibitionArtworks}
                setExhibitionArtworks={setExhibitionArtworks}
                exhibition={exhibition}
              />
            );
          })}
          <button
            onClick={() => {
              setExhibitionArtworks({
                ...exhibitionArtworks,
                [exhibition]: [],
              });
            }}
            className="mb-8 py-2 px-4 bg-white border rounded-sm shadow-equal hover:bg-gray-100"
          >
            Delete All Artworks
          </button>
        </>
      ) : (
        <div>
          <p>Exhibition is Empty...</p>
          <br />
          <p>
            Head to the{" "}
            <Link
              href="/artworks"
              className="hover:text-gray-600 hover:underline"
            >
              Gallery Explorer
            </Link>{" "}
            to Add Artworks to your Exhibition
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
