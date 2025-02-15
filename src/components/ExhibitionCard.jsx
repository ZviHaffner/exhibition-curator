import Link from "next/link";

const ExhibitionCard = ({ exhibitionArtworks, exhibitionName }) => {
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

  return (
    <Link href={`/exhibitions/${exhibitionName}`}>
      <div className="pt-1 pb-4 md:py-0 md:flex items-center justify-between bg-white my-8 rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
        <p className="font-serif my-4 md:ml-8 text-2xl">{exhibitionName}</p>
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
      </div>
    </Link>
  );
};

export default ExhibitionCard;
