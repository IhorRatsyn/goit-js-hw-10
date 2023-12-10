import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const loader = document.getElementById("loader");
const error = document.getElementById("error");
const breedSelect = new SlimSelect({
  select: "#breedSelect",
  placeholder: "Select a breed"
});
const catInfo = document.getElementById("catInfo");
const catImage = document.getElementById("catImage");
const catName = document.getElementById("catName");
const catDescription = document.getElementById("catDescription");
const catTemperament = document.getElementById("catTemperament");

document.addEventListener("DOMContentLoaded", () => {
  loader.style.display = "block";
  error.style.display = "none";
  catInfo.style.display = "none";

  fetchBreeds()
    .then(response => {
      const breeds = response.data;
      breeds.forEach(breed => {
        breedSelect.setData({
          text: breed.name,
          value: breed.id
        });
      });
    })
    .catch(handleError)
    .finally(() => {
      loader.style.display = "none";
    });
});

breedSelect.slim.addEventListener("change", () => {
  const selectedBreedId = breedSelect.selected();
  if (selectedBreedId) {
    loader.style.display = "block";
    error.style.display = "none";
    catInfo.style.display = "none";

    fetchCatByBreed(selectedBreedId)
      .then(response => {
        const catData = response.data[0].breeds[0];
        displayCatInfo(catData);
      })
      .catch(handleError)
      .finally(() => {
        loader.style.display = "none";
      });
  }
});

function displayCatInfo(catData) {
  catInfo.style.display = "block";
  catImage.src = catData.url;
  catName.textContent = `Breed: ${catData.name}`;
  catDescription.textContent = `Description: ${catData.description}`;
  catTemperament.textContent = `Temperament: ${catData.temperament}`;
}

function handleError(error) {
  error.style.display = "block";
  console.error("Error:", error);
}
