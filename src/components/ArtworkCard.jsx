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
    <div className="flex items-center justify-between bg-white m-5 rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
      <Link
        href={`/artworks/${assignArtworkSrc()}/${artwork.id}`}
        className="flex items-center"
      >
        <div className="flex size-32 bg-gray-50 mr-5 rounded-l-3xl">
          {getImgSrc() ? (
            <img
              src={getImgSrc()}
              alt={artwork.title || "Artwork"}
              className="size-32 object-cover rounded-l-3xl"
            />
          ) : (
            <MdOutlineImageNotSupported className="m-auto text-gray-300 size-20" />
          )}
        </div>
        <div>
          <p className="font-bold">
            {artwork.title.length > 70
              ? artwork.title.slice(0, 70) + "..."
              : artwork.title}
          </p>
          <p className="text-sm">{getArtists()}</p>
        </div>
      </Link>
      <button
        className="mr-10 py-2 px-4 border rounded-sm shadow-equal hover:bg-gray-100"
        value={artwork.id}
        onClick={!isArtworkAdded() ? handleAddArtwork : handleRemoveArtwork}
      >
        {!isArtworkAdded() ? "Add to Exhibition" : "Remove from Exhibition"}
      </button>
    </div>
  );
};

export default ArtworkCard;
