"use client";

import { getChicagoArtworkById, getClevelandArtworkById } from "@/api";
import AddArtworkModal from "@/components/AddArtworkModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

const Artwork = () => {
  const [artwork, setArtwork] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const { apiSource, id } = useParams();

  function getArtworkApiHandler() {
    if (apiSource === "chicago") {
      return getChicagoArtworkById(id);
    }
    if (apiSource === "cleveland") {
      return getClevelandArtworkById(id);
    }
    return null;
  }

  useEffect(() => {
    getArtworkApiHandler()
      .then(({ data }) => {
        setLoading(false);
        setArtwork(data.data);
      })
      .catch((err) => {
        setLoading(false);
        if (apiSource === "chicago") setError(err.response.data);
        else if (apiSource === "cleveland")
          setError({
            status: err.response.status,
            detail: err.response.data.detail,
          });
        else
          setError({
            status: "500",
            error: "Internal Server Error",
            detail: "Something Went Wrong",
          });
      });
  }, []);

  function getImgSrc() {
    if (artwork.image_id && artwork.config?.iiif_url) {
      return `${artwork.config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;
    }
    if (artwork.images?.web?.url) {
      return artwork.images.web.url;
    }
    return null;
  }

  const getArtists = () => {
    if (artwork.artist_display) return artwork.artist_display;
    if (artwork.creators) {
      return artwork.creators
        .map((artist) => artist.description || "Unknown Artist")
        .join(", ");
    }
    return "Unknown Artist";
  };

  if (loading) return <LoadingSpinner />;

  if (Object.keys(error).length)
    return (
      <div className="my-8 text-center">
        <h2 className="text-lg font-bold">{error.status}</h2>
        <p>{error.error}</p>
        <p>{error.detail}</p>
      </div>
    );

  return (
    <div>
      {getImgSrc() ? (
        <img
          src={getImgSrc()}
          alt={artwork.title || "Artwork"}
          className="my-4 md:my-10 mx-auto w-11/12 md:w-1/4"
        />
      ) : (
        <MdOutlineImageNotSupported className="my-10 m-auto text-gray-300 size-52" />
      )}
      <div className="bg-white">
        <div className="py-10 mx-auto w-11/12 md:w-1/2 text-lg">
          <hr className="mb-4" />
          <div className="md:flex justify-between items-start">
            <div>
              <h1 className="font-serif text-4xl mb-8">{artwork.title}</h1>
              <p className="mb-8">{artwork.date_display || artwork.date_text}</p>
              <p className="mb-8">{getArtists()}</p>
            </div>
            <div className="w-fit mx-auto my-4 md:m-0">
              <button
                onClick={() => setModalOpen(true)}
                className="px-3 py-2 border-2 border-gray-500 rounded hover:bg-green-500 hover:border-green-500 hover:text-white"
              >
                Save to Exhibition
              </button>
            </div>
          </div>
          <article
            className="font-light [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: artwork.description }}
          />
        </div>
      </div>
      <AddArtworkModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        artwork={artwork}
        getImgSrc={getImgSrc}
        getArtists={getArtists}
      />
    </div>
  );
};

export default Artwork;
