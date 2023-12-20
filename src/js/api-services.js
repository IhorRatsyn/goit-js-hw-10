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

document.addEventListener('DOMContentLoaded', async () => {
  const loader = document.querySelector('#loader');
  loader.style.display='block';
  const res = await fetchBreeds()

  const items = res.data;
  const select = document.querySelector('#breedSelect');
  items.forEach(item => {
    select.appendChild(createOptionItem(item))
  })

  loader.style.display='none';

  select.addEventListener('input', async (event) => {
    const catEl = document.querySelector('#catInfo');
    loader.style.display='block';
    const catId = event.target.value
    const catInfo = await fetchCatByBreed(catId)

    catEl.innerHTML = createCatInfo(catInfo.data[0])
    loader.style.display='none';
  })
})


function createOptionItem({id, name}) {
  const option = document.createElement('option');
  option.classList.add('select__option');
  option.value = id
  option.innerHTML = name
  return option;
}

function createCatInfo(item) {
  const detailInfo = item.breeds[0]
  return `
    <div id="catInfo" class="cat-info">
      <img src="${item.url}" alt="Cat Image" id="catImage" width="${item.width}" height="${item.height}">
      <div id="${item.id}">
        <h2 id="catName">${detailInfo.name}</h2>
        <p id="catDescription">${detailInfo.description}</p>
        <p id="catTemperament">${detailInfo.temperament}</p>
      </div>
    </div>`

}