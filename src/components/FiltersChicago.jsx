import { populateChicagoFilters, searchChicagoArtworksWithFilter } from "@/api";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const FiltersChicago = ({ searchTerm, setArtworks, setLoading, setError }) => {
  const [artists, setArtists] = useState([]);
  const [artworkTypes, setArtworkTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [placesOfOrigin, setPlacesOfOrigin] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("select");
  const [filterTerm, setFilterTerm] = useState("select");

  const [showDropdown, setShowDropdown] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);

  useEffect(() => {
    populateChicagoFilters(searchTerm)
      .then((res) => {
        const artistsArr = res.data.data.map((artwork) => {
          return artwork.artist_title || "Unknown Artist";
        });
        const uniqueArtistsSet = new Set(artistsArr);
        setArtists([...uniqueArtistsSet].sort());

        const artworkTypesArr = res.data.data.map((artwork) => {
          return artwork.artwork_type_title || "Unknown Type";
        });
        const uniqueArtworkTypesSet = new Set(artworkTypesArr);
        setArtworkTypes([...uniqueArtworkTypesSet].sort());

        const departmentsArr = res.data.data.map((artwork) => {
          return artwork.department_title || "Unknown Department";
        });
        const uniqueDepartmentsSet = new Set(departmentsArr);
        setDepartments([...uniqueDepartmentsSet].sort());

        const originsArr = res.data.data.map((artwork) => {
          return artwork.place_of_origin || "Unknown Origin";
        });
        const uniqueOriginsSet = new Set(originsArr);
        setPlacesOfOrigin([...uniqueOriginsSet].sort());

        setLoadingFilters(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingFilters(false);
      });
  }, []);

  function renderFilterDropdown() {
    if (selectedFilter === "artist_title") {
      return (
        <>
          <label htmlFor="artists" className="my-2">
            Artists
          </label>
          <select
            name="artists"
            id="artists"
            className="p-2"
            value={filterTerm}
            onChange={(e) => {
              setFilterTerm(e.target.value);
            }}
          >
            <option value="select" disabled>
              Select an Artist
            </option>
            {loadingFilters ? (
              <option value="loading" disabled>
                Loading Options...
              </option>
            ) : (
              artists.map((artist) => {
                return (
                  <option value={artist} key={artist}>
                    {artist}
                  </option>
                );
              })
            )}
          </select>
        </>
      );
    } else if (selectedFilter === "artwork_type_title") {
      return (
        <>
          <label htmlFor="artworkTypes" className="my-2">
            Artwork Type
          </label>
          <select
            name="artworkTypes"
            id="artworkTypes"
            className="p-2"
            value={filterTerm}
            onChange={(e) => {
              setFilterTerm(e.target.value);
            }}
          >
            <option value="select" disabled>
              Select a Type
            </option>
            {loadingFilters ? (
              <option value="loading" disabled>
                Loading Options...
              </option>
            ) : (
              artworkTypes.map((artworkType) => {
                return (
                  <option value={artworkType} key={artworkType}>
                    {artworkType}
                  </option>
                );
              })
            )}
          </select>
        </>
      );
    } else if (selectedFilter === "department_title") {
      return (
        <>
          <label htmlFor="departments" className="my-2">
            Departments
          </label>
          <select
            name="departments"
            id="departments"
            className="p-2"
            value={filterTerm}
            onChange={(e) => {
              setFilterTerm(e.target.value);
            }}
          >
            <option value="select" disabled>
              Select a Department
            </option>
            {loadingFilters ? (
              <option value="loading" disabled>
                Loading Options...
              </option>
            ) : (
              departments.map((department) => {
                return (
                  <option value={department} key={department}>
                    {department}
                  </option>
                );
              })
            )}
          </select>
        </>
      );
    } else if (selectedFilter === "place_of_origin") {
      return (
        <>
          <label htmlFor="placesOfOrigin" className="my-2">
            Places of Origin
          </label>
          <select
            name="placesOfOrigin"
            id="placesOfOrigin"
            className="p-2"
            value={filterTerm}
            onChange={(e) => {
              setFilterTerm(e.target.value);
            }}
          >
            <option value="select" disabled>
              Select a Place of Origin
            </option>
            {loadingFilters ? (
              <option value="loading" disabled>
                Loading Options...
              </option>
            ) : (
              placesOfOrigin.map((origin) => {
                return (
                  <option value={origin} key={origin}>
                    {origin}
                  </option>
                );
              })
            )}
          </select>
        </>
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    searchChicagoArtworksWithFilter(
      searchTerm,
      1,
      10,
      selectedFilter,
      filterTerm
    )
      .then((res) => {
        setArtworks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <form className="flex flex-col min-w-72 mr-5" onSubmit={handleSubmit}>
      <label htmlFor="filterSubject" className="my-2">
        Filter By
      </label>
      <select
        name="filterSubject"
        id="filterSubject"
        className="p-2 mb-4"
        value={selectedFilter}
        onChange={(e) => {
          setFilterTerm("select");
          setSelectedFilter(e.target.value);
        }}
      >
        <option value="select" disabled>
          Select an Option
        </option>
        <option value="artist_title">Artist</option>
        <option value="artwork_type_title">Artwork Type</option>
        <option value="department_title">Department</option>
        <option value="place_of_origin">Place of Origin</option>
      </select>

      {selectedFilter && (
        <>
          {showDropdown ? (
            renderFilterDropdown()
          ) : (
            <div className="flex gap-5 p-1 bg-white border rounded-sm">
              <CiSearch className="text-3xl text-gray-500" />
              <input
                className="grow focus:outline-none"
                type="search"
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
                placeholder="Filter Term"
              />
            </div>
          )}
          {showDropdown ? (
            <p className="text-gray-600 text-xs my-2">
              Cannot Find What You are Looking For?{" "}
              <button
                type="button"
                className="hover:underline"
                onClick={() => {
                  setShowDropdown(!showDropdown);
                }}
              >
                Input Manually
              </button>
            </p>
          ) : (
            <button
              type="button"
              className="text-gray-600 text-xs my-2 hover:underline"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              Show Dropdown List
            </button>
          )}
          <button
            type="submit"
            className="my-4 mx-auto py-2 px-4 bg-white border rounded-sm hover:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={filterTerm === "select"}
          >
            Save
          </button>
        </>
      )}
    </form>
  );
};

export default FiltersChicago;
