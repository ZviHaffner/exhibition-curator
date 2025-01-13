import { MdOutlineImageNotSupported } from "react-icons/md";

const ArtworkCard = ({ selectedApi, artworks, artwork }) => {
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

  return (
    <div className="flex items-center bg-white m-5 rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
      <div className="flex items-center size-32 bg-gray-50 mr-5 rounded-l-3xl">
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
    </div>
  );
};

export default ArtworkCard;
