import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const { apiSource } = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`?q=${searchTerm}`);
  }

  return (
    <search className="my-8">
      <form onSubmit={handleSubmit} className="w-11/12 md:w-1/2 mx-auto">
        <div className="flex gap-5 p-1 bg-white border border-gray-300 rounded-full shadow-equal">
          <CiSearch className="text-3xl text-gray-500" />
          <input
            className="grow rounded-r-full focus:outline-none"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={`Search Artworks from the ${
              {
                chicago: "Art Institute of Chicago",
                cleveland: "Cleveland Museum of Art",
              }[apiSource]
            }`}
            required
          />
        </div>
      </form>
    </search>
  );
};

export default SearchBar;
