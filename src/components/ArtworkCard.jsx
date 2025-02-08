import { ExhibitionArtworksContext } from "@/contexts/ExhibitionArtworksProvider";
import Link from "next/link";
import { useContext } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

const ArtworkCard = ({ selectedApi, artworks, artwork }) => {
  const { exhibitionArtworks, setExhibitionArtworks } = useContext(
    ExhibitionArtworksContext
  );

  function getImgSrc() {
    if (
      selectedApi === "artInstChicago" &&
      artwork.image_id &&
      artworks.config?.iiif_url
    ) {
      return `${artworks.config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;
    }
    if (selectedApi === "clevelandMuseumArt" && artwork.images?.web?.url) {
      return artwork.images.web.url;
    }
    return null;
  }

  function getArtists() {
    if (selectedApi === "artInstChicago") {
      return artwork.artist_title || "Unknown Artist";
    }
    if (selectedApi === "clevelandMuseumArt") {
      const artists = artwork.creators.map(
        (artist) => artist.description || "Unknown Artist"
      );
      return artists.join(", ");
    }
  }

  function assignArtworkSrc() {
    if (selectedApi === "artInstChicago") return "chicago";
    if (selectedApi === "clevelandMuseumArt") return "cleveland";
  }

  function isArtworkAdded() {
    return exhibitionArtworks.some((savedArtwork) => {
      if (savedArtwork.id === artwork.id) {
        return true;
      }
      return false;
    });
  }

  function handleAddArtwork() {
    const title =
      artwork.title.length > 70
        ? artwork.title.slice(0, 70) + "..."
        : artwork.title;
    setExhibitionArtworks([
      ...exhibitionArtworks,
      {
        id: artwork.id,
        title,
        artists: getArtists(),
        image: getImgSrc(),
        source: assignArtworkSrc(),
      },
    ]);
  }

  function handleRemoveArtwork(e) {
    const filteredExhibition = exhibitionArtworks.filter((artwork) => {
      return artwork.id !== Number(e.currentTarget.value);
    });
    setExhibitionArtworks(filteredExhibition);
  }

  return (
    <div className="md:flex items-center justify-between bg-white my-8 rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
      <Link
        href={`/artworks/${assignArtworkSrc()}/${artwork.id}`}
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
            {artwork.title.length > 70
              ? artwork.title.slice(0, 70) + "..."
              : artwork.title}
          </p>
          <p className="text-center md:text-left text-sm">{getArtists()}</p>
        </section>
      </Link>
      <div className="w-full flex justify-center md:w-auto md:mr-10">
        <button
          className="mb-4 md:mb-0 py-2 px-4 border rounded-sm shadow-md hover:bg-gray-100"
          value={artwork.id}
          onClick={!isArtworkAdded() ? handleAddArtwork : handleRemoveArtwork}
        >
          {!isArtworkAdded() ? "Add to Exhibition" : "Remove from Exhibition"}
        </button>
      </div>
    </div>
  );
};

export default ArtworkCard;
