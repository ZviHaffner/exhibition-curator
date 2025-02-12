import {
  populateClevelandArtistFilter,
  searchClevelandArtworksWithFilter,
} from "@/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FiltersCleveland = ({
  setArtworks,
  setLoading,
  setError,
}) => {
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
  const [creationDatesErr, setCreationDatesErr] = useState("");

  const [artist, setArtist] = useState("select");
  const [department, setDepartment] = useState("select");
  const [type, setType] = useState("select");
  const [createdBefore, setCreatedBefore] = useState("");
  const [createdAfter, setCreatedAfter] = useState("");

  const searchParams = useSearchParams();
    const query = searchParams.get("q");

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
    if (
      artist !== "select" ||
      department !== "select" ||
      type !== "select" ||
      createdBefore ||
      createdAfter
    )
      return false;
    else return true;
  }

  function handleReset() {
    setArtist("select");
    setDepartment("select");
    setType("select");
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
      setLoading(true);
      searchClevelandArtworksWithFilter(
        query,
        artist === "select" ? null : artist,
        department === "select" ? null : department,
        type === "select" ? null : type,
        createdBefore === "" ? null : createdBefore,
        createdAfter === "" ? null : createdAfter,
        0,
        10
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
  }

  return (
    <form
      className="flex flex-col min-w-72 md:pr-5 md:mr-5 md:border-r"
      onSubmit={handleSubmit}
    >
      <label htmlFor="artists" className="my-2">
        Artists
      </label>
      <select
        name="artists"
        id="artists"
        value={artist}
        className="p-2"
        onChange={(e) => {
          setArtist(e.target.value);
        }}
      >
        <option value="select" disabled>
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

      <label htmlFor="departments" className="my-2">
        Department
      </label>
      <select
        name="departments"
        id="departments"
        value={department}
        className="p-2"
        onChange={(e) => {
          setDepartment(e.target.value);
        }}
      >
        <option value="select" disabled>
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
        name="types"
        id="types"
        value={type}
        className="p-2"
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <option value="select" disabled>
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
          name="created_after"
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
          name="created_before"
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
