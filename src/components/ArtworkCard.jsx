import { MdOutlineImageNotSupported } from "react-icons/md";

const ArtworkCard = ({ artworks, artwork }) => {
  return (
    <div className="flex items-center bg-white m-5 rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
      <div className="flex items-center size-32 bg-gray-50 mr-5 rounded-l-3xl">
        {artwork.image_id ? (
          <img
            src={
              artworks.config.iiif_url +
              "/" +
              artwork.image_id +
              "/full/843,/0/default.jpg"
            }
            alt={artwork.medium_display}
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
        <p className="text-sm">{artwork.artist_title}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;
