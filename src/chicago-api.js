import axios from "axios";

const artInstChicagoApi = axios.create({
  baseURL: "https://api.artic.edu/api/v1/artworks",
});

export const search = (q) => {
  return artInstChicagoApi.get("/search?fields=id,api_link,title,artist_title,date_start,artwork_type_title,image_id,medium_display", {
    params: { q },
  });
};
