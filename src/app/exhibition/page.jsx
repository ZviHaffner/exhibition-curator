"use client";

import { useContext } from "react";
import { ExhibitionArtworksContext } from "@/contexts/ExhibitionArtworksProvider";
import Link from "next/link";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const Exhibition = () => {
  const { exhibitionArtworks, setExhibitionArtworks } = useContext(
    ExhibitionArtworksContext
  );

  function handleClick(e) {
    const filteredExhibition = exhibitionArtworks.filter((artwork) => {
      return artwork.id !== Number(e.currentTarget.value);
    });
    setExhibitionArtworks(filteredExhibition);
  }

  return (
    <div className="w-2/3 mx-auto text-center">
      <h1 className="my-5 text-4xl font-serif">My Exhibition</h1>
      {!exhibitionArtworks.length ? (
        <p>
          No Artworks Have Been Added...{" "}
          <a href="/search" className="hover:text-gray-400">
            Click Here to Search our Library
          </a>
        </p>
      ) : (
        <>
          <button
            onClick={() => {
              setExhibitionArtworks([]);
            }}
          >
            Reset
          </button>
          {exhibitionArtworks.map((artwork) => {
            return (
              <div
                key={artwork.id}
                className="flex items-center justify-between bg-white m-5 text-left rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1"
              >
                <Link
                  href={`/artworks/${artwork.source}/${artwork.id}`}
                  className="flex items-center"
                >
                  <div className="flex size-32 bg-gray-50 mr-5 rounded-l-3xl">
                    {artwork.image ? (
                      <img
                        src={artwork.image}
                        alt={artwork.title || "Artwork"}
                        className="size-32 object-cover rounded-l-3xl"
                      />
                    ) : (
                      <MdOutlineImageNotSupported className="m-auto text-gray-300 size-20" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold">{artwork.title}</p>
                    <p className="text-sm">{artwork.artists}</p>
                  </div>
                </Link>
                <button
                  className="mr-10 text-xl text-gray-500 hover:text-red-600 disabled:text-gray-500 disabled:cursor-not-allowed"
                  value={artwork.id}
                  onClick={handleClick}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Exhibition;
