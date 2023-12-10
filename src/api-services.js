// api-services.js
import axios from "axios";

const apiKey = "live_VTKxTfjUxbSqIaGoNrO4oNlLVoA57HoJJe5kRrvuK4JnjlSd8m9pYupvKdu5aCGz"; 
axios.defaults.headers.common["x-api-key"] = apiKey;

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds");
};

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
};
