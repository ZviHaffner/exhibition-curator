import axios from "axios";

const artInstChicagoApi = axios.create({
  baseURL: "https://api.artic.edu/api/v1/artworks",
});

export const searchChicagoArtworks = (q, page, limit) => {
  return artInstChicagoApi.get(
    "/search?fields=id,api_link,title,artist_title,date_start,artwork_type_title,image_id,medium_display",
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

const clevelandMuseumArtApi = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api/artworks",
});

export const searchClevelandArtworks = (q, skip, limit) => {
  return clevelandMuseumArtApi.get("/?fields=id,title,creators,images", {
    params: { q, skip, limit },
  });
};

export const getClevelandArtworkById = (id) => {
  return clevelandMuseumArtApi.get(
    `/${id}?fields=id,title,date_text,creators,description,images`
  );
};
