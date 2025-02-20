import { useState, useContext, useEffect } from "react";
import { ExhibitionArtworksContext } from "@/contexts/ExhibitionArtworksProvider";
import Modal from "react-modal";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useParams } from "next/navigation";

const AddArtworkModal = ({
  isOpen,
  onRequestClose,
  artwork,
  getImgSrc,
  getArtists,
}) => {
  const { exhibitionArtworks, setExhibitionArtworks } = useContext(
    ExhibitionArtworksContext
  );

  const [chosenExhibition, setChosenExhibition] = useState("");
  const [showTextInput, setShowTextInput] = useState(true);
  const [error, setError] = useState("");

  const { apiSource } = useParams();

  useEffect(() => {
    Object.keys(exhibitionArtworks).length
      ? setShowTextInput(false)
      : setShowTextInput(true);
  }, [exhibitionArtworks]);

  function handleAddArtwork(e) {
    e.preventDefault();
    setError("");
    const title =
      artwork.title.length > 40
        ? artwork.title.slice(0, 40) + "..."
        : artwork.title;

    if (
      exhibitionArtworks[chosenExhibition]?.some(
        (savedArtwork) => savedArtwork.id === artwork.id
      )
    ) {
      setError(
        `${artwork.title} has already been added to Exhibition '${chosenExhibition}'`
      );
    } else {
      setExhibitionArtworks((prevExhibitionArtworks) => {
        const updatedExhibition = prevExhibitionArtworks[chosenExhibition]
          ? [
              ...prevExhibitionArtworks[chosenExhibition],
              {
                id: artwork.id,
                title,
                artists: getArtists(),
                image: getImgSrc(),
                source: apiSource,
              },
            ]
          : [
              {
                id: artwork.id,
                title,
                artists: getArtists(),
                image: getImgSrc(),
                source: apiSource,
              },
            ];
        return {
          ...prevExhibitionArtworks,
          [chosenExhibition]: updatedExhibition,
        };
      });
      alert(
        `${artwork.title} has successfully been added to Exhibition '${chosenExhibition}'!`
      );
      onRequestClose();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      contentLabel="Add Artwork to Collection"
      className="relative w-11/12 md:w-fit md:min-w-96 bg-white rounded-lg shadow-md "
      overlayClassName="fixed inset-0 flex items-center justify-center backdrop-blur-md"
    >
      <button
        className="text-3xl absolute top-0 right-3 text-gray-500 hover:text-red-600"
        onClick={onRequestClose}
      >
        &times;
      </button>
      {getImgSrc() ? (
        <img
          src={getImgSrc()}
          alt={artwork.title || "Artwork"}
          className="mt-12 mx-auto size-80 object-cover border-8 border-gray-50"
        />
      ) : (
        <MdOutlineImageNotSupported className="mx-auto mt-12 mb-4 text-gray-300 size-20" />
      )}
      <p className="px-4 my-2 font-serif text-center">{artwork.title}</p>
      <h2 className="mt-4 text-center font-serif text-xl">Add to Exhibition</h2>
      <form>
        <div className="text-center mt-2">
          {!showTextInput ? (
            <>
              <select
                name="exhibition"
                id="exhibition"
                className="p-2 w-3/4 border rounded"
                value={chosenExhibition}
                onChange={(e) => {
                  setChosenExhibition(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select an Exhibition
                </option>
                {Object.keys(exhibitionArtworks).map((exhibition) => {
                  return (
                    <option key={exhibition} value={exhibition} className="p-2">
                      {exhibition}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <input
              value={chosenExhibition}
              onChange={(e) => setChosenExhibition(e.target.value)}
              placeholder="Please Insert Exhibition Name"
              className="w-3/4 p-2 border"
            />
          )}
          <br />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {Object.keys(exhibitionArtworks).length ? (
            <button
              type="button"
              className="mt-2 mb-4 text-sm hover:underline hover:text-gray-600"
              onClick={() => setShowTextInput(!showTextInput)}
            >
              {showTextInput
                ? "Show Saved Exhibitions"
                : "Manually Enter (New) Exhibition Name"}
            </button>
          ) : null}
          <div className="mt-4 w-full h-16 bg-gray-50 rounded-b-lg" />
          <button
            onClick={handleAddArtwork}
            className="absolute bottom-3 right-3 px-3 py-2 text-sm bg-green-500 text-white font-semibold border rounded-md shadow-xs hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!chosenExhibition}
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddArtworkModal;
