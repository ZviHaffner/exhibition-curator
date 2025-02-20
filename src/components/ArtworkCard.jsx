import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AddArtworkModal from "./AddArtworkModal";
import { MdOutlineImageNotSupported } from "react-icons/md";

const ArtworkCard = ({ artworks, artwork }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { apiSource } = useParams();

  function getImgSrc() {
    if (
      apiSource === "chicago" &&
      artwork.image_id &&
      artworks.config?.iiif_url
    ) {
      return `${artworks.config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;
    }
    if (apiSource === "cleveland" && artwork.images?.web?.url) {
      return artwork.images.web.url;
    }
    return null;
  }

  function getArtists() {
    if (apiSource === "chicago") {
      return artwork.artist_title || "Unknown Artist";
    }
    if (apiSource === "cleveland") {
      const artists = artwork.creators.map(
        (artist) => artist.description || "Unknown Artist"
      );
      return artists.join(", ");
    }
  }

  return (
    <div className="md:flex items-center justify-between bg-white my-8 rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
      <Link
        href={`/artworks/${apiSource}/${artwork.id}`}
        className="md:flex items-center"
      >
        <div className="flex h-48 md:size-32 md:mr-5 md:rounded-l-3xl bg-gray-50">
          {getImgSrc() ? (
            <img
              src={getImgSrc()}
              alt={artwork.title || "Artwork"}
              className="w-full h-48 rounded-t-3xl object-cover md:size-32 md:rounded-none md:rounded-l-3xl"
            />
          ) : (
            <MdOutlineImageNotSupported className="m-auto text-gray-300 size-20" />
          )}
        </div>
        <section className="my-4">
          <p className="text-center md:text-left font-bold">
            {artwork.title.length > 40
              ? artwork.title.slice(0, 40) + "..."
              : artwork.title}
          </p>
          <p className="text-center md:text-left text-sm">{getArtists()}</p>
        </section>
      </Link>
      <div className="w-fit mx-auto md:m-0">
        <button
          onClick={() => setModalOpen(true)}
          className="mb-4 md:mb-0 md:mr-8 px-3 py-2 bg-gray-400 text-white font-semibold rounded hover:bg-green-500"
        >
          Save to Exhibition
        </button>
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

export default ArtworkCard;
