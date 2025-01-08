import ArtworkCard from "@/components/ArtworkCard";
import PaginationBar from "@/components/PaginationBar";

const ArtworkList = ({
  searchTerm,
  artworks,
  setArtworks,
  setLoading,
  setError,
}) => {
  return (
    <div>
      {artworks.data?.length > 0 && (
        <p className="text-center text-sm">
          {artworks.pagination.total} Results
        </p>
      )}
      {artworks.data?.length > 0 &&
        artworks.data.map((artwork) => {
          return (
            <ArtworkCard
              key={artwork.id}
              artworks={artworks}
              artwork={artwork}
            />
          );
        })}
      <PaginationBar
        paginationData={artworks.pagination}
        searchTerm={searchTerm}
        setArtworks={setArtworks}
        setLoading={setLoading}
        setError={setError}
      />
    </div>
  );
};

export default ArtworkList;
