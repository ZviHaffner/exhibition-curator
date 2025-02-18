import axios from "axios";

// Chicago API Functions

const artInstChicagoApi = axios.create({
  baseURL: "https://api.artic.edu/api/v1/artworks",
});

export const allChicagoArtworks = (page, limit) => {
  return artInstChicagoApi.get("?fields=id,title,artist_title,image_id", {
    params: { page, limit },
  });
};

export const searchChicagoArtworks = (q, page, limit) => {
  return artInstChicagoApi.get(
    "/search?fields=id,title,artist_title,image_id",
    {
      params: { q, page, limit },
    }
  );
};

export const populateChicagoFilters = (q) => {
  return artInstChicagoApi.get(
    "/search?fields=artist_title,artwork_type_title,place_of_origin,department_title&limit=100",
    {
      params: { q },
    }
  );
};

export const searchChicagoArtworksWithFilter = (
  q,
  page,
  limit,
  field,
  filterTerm
) => {
  return artInstChicagoApi.get(
    `/search?fields=id,title,artist_title,image_id&query[match][${field}]=${filterTerm}`,
    {
      params: { q, page, limit },
    }
  );
};

export const getChicagoArtworkById = (id) => {
  return artInstChicagoApi.get(
    `/${id}?fields=id,title,date_display,artist_display,description,image_id`
  );
};

// Cleveland API Functions

const clevelandMuseumArtApi = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api/artworks",
});

export const allClevelandArtworks = (skip, limit) => {
  return clevelandMuseumArtApi.get("/?fields=id,title,creators,images", {
    params: { skip, limit },
  });
};

export const searchClevelandArtworks = (
  q,
  skip,
  limit,
  artists,
  department,
  type,
  created_before,
  created_after
) => {
  return clevelandMuseumArtApi.get("/?fields=id,title,creators,images", {
    params: {
      q,
      skip,
      limit,
      artists,
      department,
      type,
      created_before,
      created_after,
    },
  });
};

export const populateClevelandArtistFilter = (q) => {
  return clevelandMuseumArtApi.get("/?fields=creators", {
    params: { q },
  });
};

export const getClevelandArtworkById = (id) => {
  return clevelandMuseumArtApi.get(
    `/${id}?fields=id,title,date_text,creators,description,images`
  );
};
