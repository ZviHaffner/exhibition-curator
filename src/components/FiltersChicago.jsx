import { populateChicagoFilters } from "@/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const FiltersChicago = () => {
  const [artists, setArtists] = useState([]);
  const [artworkTypes, setArtworkTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [placesOfOrigin, setPlacesOfOrigin] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  const [showDropdown, setShowDropdown] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();

  function extractUniqueSortedValues(data, key, fallback) {
    return [...new Set(data.map((artwork) => artwork[key] || fallback))].sort();
  }

  useEffect(() => {
    populateChicagoFilters(query)
      .then((res) => {
        const data = res.data.data;

        setArtists(
          extractUniqueSortedValues(data, "artist_title", "Unknown Artist")
        );
        setArtworkTypes(
          extractUniqueSortedValues(data, "artwork_type_title", "Unknown Type")
        );
        setDepartments(
          extractUniqueSortedValues(
            data,
            "department_title",
            "Unknown Department"
          )
        );
        setPlacesOfOrigin(
          extractUniqueSortedValues(data, "place_of_origin", "Unknown Origin")
        );

        setLoadingFilters(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingFilters(false);
      });
  }, []);

  function renderFilterDropdown() {
    function createFilterDropdown(selectedFilter, dataset) {
      return (
        <>
          <label htmlFor={selectedFilter + "s"} className="my-2">
            {selectedFilter
              .split("_")
              .map((word) => {
                return word[0].toUpperCase() + word.slice(1);
              })
              .join(" ")}
          </label>
          <select
            id={selectedFilter + "s"}
            className="p-2"
            value={filterTerm}
            onChange={(e) => {
              setFilterTerm(e.target.value);
            }}
          >
            <option value="" disabled>
              Select an Option
            </option>
            {loadingFilters ? (
              <option value="loading" disabled>
                Loading Options...
              </option>
            ) : (
              dataset.map((data) => {
                return (
                  <option value={data} key={data}>
                    {data}
                  </option>
                );
              })
            )}
          </select>
        </>
      );
    }

    if (selectedFilter === "artist_title") {
      return createFilterDropdown(selectedFilter, artists);
    } else if (selectedFilter === "artwork_type_title") {
      return createFilterDropdown(selectedFilter, artworkTypes);
    } else if (selectedFilter === "department_title") {
      return createFilterDropdown(selectedFilter, departments);
    } else if (selectedFilter === "place_of_origin") {
      return createFilterDropdown(selectedFilter, placesOfOrigin);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    query
      ? router.push(`?q=${query}&${selectedFilter}=${filterTerm}`)
      : router.push(`?${selectedFilter}=${filterTerm}`);
  }

  return (
    <form
      className="flex flex-col min-w-72 md:pr-5 md:mr-5 md:border-r"
      onSubmit={handleSubmit}
    >
      <label htmlFor="filterSubject" className="my-2">
        Filter By
      </label>
      <select
        name="filterSubject"
        id="filterSubject"
        className="p-2 mb-4"
        value={selectedFilter}
        onChange={(e) => {
          setFilterTerm("");
          setSelectedFilter(e.target.value);
        }}
      >
        <option value="" disabled>
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
            <p className="text-gray-600 text-xs text-center my-2">
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
            className="my-4 mx-auto py-2 px-4 bg-white border rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!filterTerm}
          >
            Save
          </button>
        </>
      )}
    </form>
  );
};

export default FiltersChicago;
