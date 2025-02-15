import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineImageNotSupported } from "react-icons/md";

const ExhibitionArtworkCard = ({
  artwork,
  exhibitionArtworks,
  setExhibitionArtworks,
  exhibition,
}) => {
  function handleClick(e) {
    const filteredExhibition = exhibitionArtworks[exhibition].filter(
      (artwork) => {
        return artwork.id !== Number(e.currentTarget.value);
      }
    );
    setExhibitionArtworks((prevExhibitionArtworks) => {
      return {
        ...prevExhibitionArtworks,
        [exhibition]: filteredExhibition,
      };
    });
  }

  return (
    <div className="md:flex items-center justify-between bg-white my-8 rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
      <Link
        href={`/artworks/${artwork.source}/${artwork.id}`}
        className="md:flex items-center"
      >
        <div className="flex h-48 md:size-32 md:mr-5 md:rounded-l-3xl bg-gray-50">
          {artwork.image ? (
            <img
              src={artwork.image}
              alt={artwork.title || "Artwork"}
              className="w-full h-48 rounded-t-3xl object-cover md:size-32 md:rounded-none md:rounded-l-3xl"
            />
          ) : (
            <MdOutlineImageNotSupported className="m-auto text-gray-300 size-20" />
          )}
        </div>
        <div className="my-4">
          <p className="md:text-left font-bold">{artwork.title}</p>
          <p className="md:text-left text-sm">{artwork.artists}</p>
        </div>
      </Link>
      <button
        className="mb-4 md:mb-0 md:mr-10 text-xl text-gray-500 hover:text-red-600"
        value={artwork.id}
        onClick={handleClick}
      >
        <FaRegTrashAlt />
      </button>
    </div>
  );
};

export default ExhibitionArtworkCard;
