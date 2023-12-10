// api-services.js
import axios from "axios";

const apiKey = "YOUR_API_KEY"; // Replace with your API key
axios.defaults.headers.common["x-api-key"] = apiKey;

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds");
};

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
};
