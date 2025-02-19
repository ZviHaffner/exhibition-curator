import { ExhibitionArtworksContext } from "@/contexts/ExhibitionArtworksProvider";
import Link from "next/link";
import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const ExhibitionCard = ({ exhibitionName }) => {
  const { exhibitionArtworks, setExhibitionArtworks } = useContext(
    ExhibitionArtworksContext
  );
  function createImgsPreview(exhibitionName) {
    const imgsArr = [];
    for (let i = 0; i < exhibitionArtworks[exhibitionName].length; i++) {
      if (imgsArr.length === 3) break;
      else if (exhibitionArtworks[exhibitionName][i].image) {
        const artwork = exhibitionArtworks[exhibitionName][i];
        imgsArr.push({ key: i, title: artwork.title, image: artwork.image });
      }
    }
    return imgsArr;
  }

  function handleDelete() {
    setExhibitionArtworks((exhibitionArtworks) => {
      const { [exhibitionName]: _, ...newExhibtionArtworks } =
        exhibitionArtworks;
      return newExhibtionArtworks;
    });
  }

  return (
    <div className="pt-1 pb-4 md:py-0 md:flex items-center justify-between bg-white my-8 rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
      <Link href={`/exhibitions/${exhibitionName}`} className="flex-1">
        <p className="md:text-left font-serif my-4 md:ml-8 text-2xl">{exhibitionName}</p>
      </Link>
      <div className="md:flex">
        <Link href={`/exhibitions/${exhibitionName}`}>
          <div className="flex justify-center md:mr-6">
            {createImgsPreview(exhibitionName).map((artwork) => {
              return (
                <img
                  key={artwork.key}
                  src={artwork.image}
                  alt={artwork.title || "Artwork"}
                  className="object-cover size-28 border-8 m-2 shadow-xl"
                />
              );
            })}
          </div>
        </Link>
        <button
          className="mt-4 mb-2 md:my-0 md:mr-6 text-xl text-gray-500 hover:text-red-600"
          onClick={handleDelete}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default ExhibitionCard;
