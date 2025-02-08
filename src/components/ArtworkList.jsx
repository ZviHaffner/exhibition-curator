import ArtworkCard from "@/components/ArtworkCard";
import PaginationBar from "@/components/PaginationBar";

const ArtworkList = ({
  selectedApi,
  searchTerm,
  artworks,
  setArtworks,
  setLoading,
  setError,
}) => {
  function renderResultsCount() {
    let middleKey;
    if (selectedApi === "artInstChicago") {
      middleKey = "pagination";
    }
    if (selectedApi === "clevelandMuseumArt") {
      middleKey = "info";
    }
    return (
      <p className="text-center text-sm">{artworks[middleKey].total} Results</p>
    );
  }
  
  return (
    <div className="flex-1">
      {renderResultsCount()}
      {artworks.data?.length > 0 &&
        artworks.data.map((artwork) => {
          return (
            <ArtworkCard
              key={artwork.id}
              selectedApi={selectedApi}
              artworks={artworks}
              artwork={artwork}
            />
          );
        })}
      <PaginationBar
        selectedApi={selectedApi}
        paginationData={artworks.pagination || artworks.info}
        searchTerm={searchTerm}
        setArtworks={setArtworks}
        setLoading={setLoading}
        setError={setError}
      />
    </div>
  );
};

export default ArtworkList;
