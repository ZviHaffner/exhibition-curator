"use client";

import { getChicagoArtworkById, getClevelandArtworkById } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

const Artwork = () => {
  const [artwork, setArtwork] = useState({});
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
        setArtwork(data);
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
    if (artwork.data.image_id && artwork.config?.iiif_url) {
      return `${artwork.config.iiif_url}/${artwork.data.image_id}/full/843,/0/default.jpg`;
    }
    if (artwork.data?.images?.web?.url) {
      return artwork.data.images.web.url;
    }
    return null;
  }

  const getArtists = () => {
    if (artwork.data?.artist_display) return artwork.data.artist_display;
    if (artwork.data?.creators) {
      return artwork.data.creators
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
          alt={artwork.data?.title || "Artwork"}
          className="my-4 md:my-10 mx-auto w-11/12 md:w-1/4"
        />
      ) : (
        <MdOutlineImageNotSupported className="my-10 m-auto text-gray-300 size-52" />
      )}
      <div className="bg-white">
        <div className="py-10 mx-auto w-11/12 md:w-1/2 text-lg">
          <hr className="mb-4" />
          <h1 className="font-serif text-4xl mb-8">{artwork.data.title}</h1>
          <p className="mb-8">
            {artwork.data.date_display || artwork.data.date_text}
          </p>
          <p className="mb-8">{getArtists()}</p>
          <article
            className="font-light [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: artwork.data.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default Artwork;
