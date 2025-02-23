"use client";

import { useEffect, useState } from "react";
import ArtworkList from "@/components/ArtworkList";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { notFound, useParams, useSearchParams } from "next/navigation";
import {
  allChicagoArtworks,
  allClevelandArtworks,
  searchChicagoArtworks,
  searchChicagoArtworksWithFilter,
  searchClevelandArtworks,
} from "@/api";
import Link from "next/link";

const Search = () => {
  const [artworks, setArtworks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const { apiSource } = useParams();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const paramsObject = Object.fromEntries(searchParams.entries());
  const paramsKeys = Object.keys(paramsObject);

  function checkIfFilter() {
    return paramsKeys.some((filterSubject) => {
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

  useEffect(() => {
    setError({});
    setLoading(true);
    if (!query && !checkIfFilter()) {
      if (apiSource === "chicago") {
        allChicagoArtworks(paramsObject.page ? paramsObject.page : 1, 10)
          .then((res) => setArtworks(res.data))
          .catch((err) =>
            setError(
              err.response?.data || { status: 500, detail: "Unexpected error" }
            )
          )
          .finally(() => setLoading(false));
      }
      if (apiSource === "cleveland") {
        allClevelandArtworks(
          paramsObject.page ? (paramsObject.page - 1) * 10 : 0,
          10
        )
          .then((res) => setArtworks(res.data))
          .catch((err) =>
            setError({
              status: err.response.status,
              detail: err.response.data.detail[0].msg,
            })
          )
          .finally(() => setLoading(false));
      }
    } else if (query && !checkIfFilter()) {
      if (apiSource === "chicago") {
        searchChicagoArtworks(query, paramsObject.page ? paramsObject.page : 1)
          .then((res) => setArtworks(res.data))
          .catch((err) => {
            setError(
              err.response?.data || { status: 500, detail: "Unexpected error" }
            );
          })
          .finally(() => setLoading(false));
      }
      if (apiSource === "cleveland") {
        searchClevelandArtworks(
          query,
          paramsObject.page ? (paramsObject.page - 1) * 10 : 0,
          10
        )
          .then((res) => setArtworks(res.data))
          .catch((err) => {
            setError({
              status: err.response.status,
              detail: err.response.data.detail[0].msg,
            });
          })
          .finally(() => setLoading(false));
      }
    } else if (checkIfFilter()) {
      if (apiSource === "chicago") {
        searchChicagoArtworksWithFilter(
          query,
          paramsObject.page ? paramsObject.page : 1,
          10,
          getChicagoFilterSubject(),
          paramsObject[getChicagoFilterSubject()]
        )
          .then((res) => setArtworks(res.data))
          .catch((err) => {
            setError(
              err.response?.data || { status: 500, detail: "Unexpected error" }
            );
          })
          .finally(() => setLoading(false));
      }
      if (apiSource === "cleveland") {
        searchClevelandArtworks(
          query,
          paramsObject.page ? (paramsObject.page - 1) * 10 : 0,
          10,
          paramsObject.artist_title,
          paramsObject.department_title,
          paramsObject.artwork_type_title,
          paramsObject.created_before,
          paramsObject.created_after
        )
          .then((res) => setArtworks(res.data))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }
    }
  }, [searchParams]);

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
      <SearchBar />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ArtworkList
          artworks={artworks}
          error={error}
          isFiltered={checkIfFilter()}
        />
      )}
    </div>
  );
};

export default Search;
