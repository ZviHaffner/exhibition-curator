import { populateChicagoFilters } from "@/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const FiltersChicago = () => {
  const searchParams = useSearchParams();
  const paramsKeys = Array.from(searchParams.keys());

  function getChicagoFilterSubject() {
    return paramsKeys.find((filterSubject) => {
      return (
        filterSubject === "artist_title" ||
        filterSubject === "artwork_type_title" ||
        filterSubject === "department_title" ||
        filterSubject === "place_of_origin" ||
        filterSubject === "created_before" ||
        filterSubject === "created_after"
      );
    });
  }

  const [artists, setArtists] = useState([]);
  const [artworkTypes, setArtworkTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [placesOfOrigin, setPlacesOfOrigin] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState(
    getChicagoFilterSubject() || ""
  );
  const [filterTerm, setFilterTerm] = useState(
    searchParams.get(getChicagoFilterSubject()) || ""
  );

  const [showDropdown, setShowDropdown] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);

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
                  setFilterTerm("");
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
                setFilterTerm("");
              }}
            >
              Show Dropdown List
            </button>
          )}
        </>
      )}
      <div className="flex">
        <button
          type="submit"
          className="my-4 mx-auto py-2 px-3 bg-white border rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </button>
        <button
          type="button"
          className="my-4 mx-auto py-2 px-4 bg-white border rounded-sm hover:bg-gray-100"
          onClick={() => {
            setSelectedFilter("");
            setFilterTerm("");
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default FiltersChicago;
