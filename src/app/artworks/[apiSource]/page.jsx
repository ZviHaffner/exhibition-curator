"use client";

import { useEffect, useState } from "react";
import ArtworkList from "@/components/ArtworkList";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { notFound, useParams } from "next/navigation";
import { allChicagoArtworks, allClevelandArtworks } from "@/api";
import Link from "next/link";

const Search = () => {
  const [artworks, setArtworks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const { apiSource } = useParams();

  useEffect(() => {
    setError({});
    setLoading(true);
    if (apiSource === "chicago") {
      allChicagoArtworks(0, 10)
        .then((res) => {
          setArtworks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
        });
    }
    if (apiSource === "cleveland") {
      allClevelandArtworks(0, 10)
        .then((res) => {
          setArtworks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError({
            status: err.response.status,
            detail: err.response.data.detail[0].msg,
          });
        });
    }
  }, []);

  if (apiSource !== "chicago" && apiSource !== "cleveland") notFound();

  return (
    <div>
      <h1 className="mt-8 text-center font-serif">
        <span className="text-xl">Welcome To</span>
        <br />
        <span className="text-4xl">
          The{" "}
          {
            {
              chicago: "Art Institute of Chicago",
              cleveland: "Cleveland Museum of Art",
            }[apiSource]
          }
        </span>
        <br />
        <span className="text-xl">Collection</span>
      </h1>
      <Link
        href={`/artworks/${
          { chicago: "cleveland", cleveland: "chicago" }[apiSource]
        }`}
      >
        <p className="text-center text-sm hover:text-gray-400">
          Click Here to View Artworks from the{" "}
          {
            {
              chicago: "Cleveland Museum of Art",
              cleveland: "Art Institute of Chicago",
            }[apiSource]
          }
        </p>
      </Link>
      <SearchBar
        setArtworks={setArtworks}
        setLoading={setLoading}
        setError={setError}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ArtworkList
          artworks={artworks}
          setArtworks={setArtworks}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};

export default Search;
