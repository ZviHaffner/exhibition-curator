import { populateClevelandArtistFilter } from "@/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const FiltersCleveland = () => {
  const departments = [
    "African Art",
    "American Painting and Sculpture",
    "Art of the Americas",
    "Chinese Art",
    "Contemporary Art",
    "Decorative Art and Design",
    "Drawings",
    "Egyptian and Ancient Near Eastern Art",
    "European Painting and Sculpture",
    "Greek and Roman Art",
    "Indian and South East Asian Art",
    "Islamic Art",
    "Japanese Art",
    "Korean Art",
    "Medieval Art",
    "Modern European Painting and Sculpture",
    "Oceania",
    "Performing Arts, Music, & Film",
    "Photography",
    "Prints",
    "Textiles",
  ];

  const types = [
    "Amulets",
    "Apparatus",
    "Arms and Armor",
    "Basketry",
    "Book Binding",
    "Bound Volume",
    "Calligraphy",
    "Carpet",
    "Ceramic",
    "Coins",
    "Cosmetic Objects",
    "Drawing",
    "Embroidery",
    "Enamel",
    "Forgery",
    "Frame",
    "Funerary Equipment",
    "Furniture and woodwork",
    "Garment",
    "Glass",
    "Glyptic",
    "Illumination",
    "Implements",
    "Inlays",
    "Ivory",
    "Jade",
    "Jewelry",
    "Knitting",
    "Lace",
    "Lacquer",
    "Leather",
    "Linoleum Block",
    "Lithographic Stone",
    "Manuscript",
    "Metalwork",
    "Miniature",
    "Miscellaneous",
    "Mixed Media",
    "Monotype",
    "Mosaic",
    "Musical Instrument",
    "Netsuke",
    "Painting",
    "Papyri",
    "Photograph",
    "Plaque",
    "Plate",
    "Portfolio",
    "Portrait Miniature",
    "Print",
    "Relief",
    "Rock crystal",
    "Rubbing",
    "Sampler",
    "Scarabs",
    "Sculpture",
    "Seals",
    "Silver",
    "Spindle Whorl",
    "Stencil",
    "Stone",
    "Tapestry",
    "Textile",
    "Time-based Media",
    "Tool",
    "Velvet",
    "Vessels",
    "Wood",
    "Woodblock",
  ];

  const thisYear = new Date().getFullYear();

  const [artists, setArtists] = useState([]);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const [showDropdown, setShowDropdown] = useState(true);
  const [creationDatesErr, setCreationDatesErr] = useState("");

  const [artist, setArtist] = useState("");
  const [department, setDepartment] = useState("");
  const [type, setType] = useState("");
  const [createdBefore, setCreatedBefore] = useState("");
  const [createdAfter, setCreatedAfter] = useState("");

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();

  useEffect(() => {
    populateClevelandArtistFilter(query)
      .then((res) => {
        const artistsArr = [];

        for (let artwork of res.data.data) {
          artwork.creators.forEach((artist) => {
            const idx = artist.description.indexOf("(");
            artistsArr.push(artist.description.slice(0, idx).trim());
          });
        }

        const uniqueArtistsSet = new Set(artistsArr);

        setArtists([...uniqueArtistsSet].sort());

        setLoadingArtists(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingArtists(false);
      });
  }, []);

  function isDisabled() {
    if (artist || department || type || createdBefore || createdAfter)
      return false;
    else return true;
  }

  function handleReset() {
    setArtist("");
    setDepartment("");
    setType("");
    setCreatedBefore("");
    setCreatedAfter("");
    setCreationDatesErr("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCreationDatesErr("");
    let isValid = true;

    if (createdAfter && createdBefore) {
      if (Number(createdAfter) > Number(createdBefore)) {
        isValid = false;
        setCreationDatesErr(
          "Created After Date cannot be after Created Before Date"
        );
      }
    }

    if (isValid) {
      const params = new URLSearchParams(searchParams.toString());
      artist
        ? params.set("artist_title", artist)
        : params.delete("artist_title");
      department
        ? params.set("department_title", department)
        : params.delete("department_title");
      type
        ? params.set("artwork_type_title", type)
        : params.delete("artwork_type_title");
      createdBefore
        ? params.set("created_before", createdBefore)
        : params.delete("created_before");
      createdAfter
        ? params.set("created_after", createdAfter)
        : params.delete("created_after");
      params.delete("page");
      router.push(`?${params.toString()}`);
    }
  }

  return (
    <form
      className="flex flex-col min-w-72 md:pr-5 md:mr-5 md:border-r"
      onSubmit={handleSubmit}
    >
      {showDropdown ? (
        <>
          <label htmlFor="artists" className="my-2">
            Artist
          </label>
          <select
            id="artists"
            value={artist}
            className="p-2"
            onChange={(e) => {
              setArtist(e.target.value);
            }}
          >
            <option value="" disabled>
              Select an Artist
            </option>
            {loadingArtists ? (
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
      ) : (
        <>
          <p className="my-2">Artist</p>
          <div className="flex gap-5 p-1 bg-white border rounded-sm">
            <CiSearch className="text-3xl text-gray-500" />
            <input
              className="grow focus:outline-none"
              type="search"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artist"
            />
          </div>
        </>
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

      <label htmlFor="departments" className="my-2">
        Department
      </label>
      <select
        id="departments"
        value={department}
        className="p-2"
        onChange={(e) => {
          setDepartment(e.target.value);
        }}
      >
        <option value="" disabled>
          Select a Department
        </option>
        {departments.map((department) => {
          return (
            <option value={department} key={department}>
              {department}
            </option>
          );
        })}
      </select>

      <label htmlFor="types" className="my-2">
        Artwork Type
      </label>
      <select
        id="types"
        value={type}
        className="p-2"
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <option value="" disabled>
          Select an Artwork Type
        </option>
        {types.map((type) => {
          return (
            <option value={type} key={type}>
              {type}
            </option>
          );
        })}
      </select>

      <h3 className="my-2">Date</h3>
      <div className="flex justify-between">
        <input
          className={`p-2 ${
            creationDatesErr ? "border-2 border-red-600" : null
          }`}
          type="number"
          id="created_after"
          placeholder="After"
          value={createdAfter}
          onChange={(e) => {
            setCreatedAfter(e.target.value);
          }}
          min="-150000"
          max={thisYear}
        />
        <input
          className={`p-2 ${
            creationDatesErr ? "border-2 border-red-600" : null
          }`}
          type="number"
          id="created_before"
          placeholder="Before"
          value={createdBefore}
          onChange={(e) => {
            setCreatedBefore(e.target.value);
          }}
          min="-150000"
          max={thisYear}
        />
      </div>
      <p className="text-center text-sm text-red-600">{creationDatesErr}</p>
      <p className="my-2 text-xs text-gray-600 text-center">
        Negative Years are BCE
        <br />
        Allows Ranges from 150,000 BCE until {thisYear}
      </p>
      <div className="flex">
        <button
          type="submit"
          className="my-4 mx-auto py-2 px-4 bg-white border rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDisabled()}
        >
          Save
        </button>
        <button
          type="button"
          className="my-4 mx-auto py-2 px-4 bg-white border rounded-sm hover:bg-gray-100"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default FiltersCleveland;
