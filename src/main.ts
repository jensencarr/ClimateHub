import "./css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  getWeather,
  showError,
  renderWeather,
  loadingSpinner,
  getLocalStorage,
} from "./services/OWMAPI";

const searchForm = document.querySelector<HTMLFormElement>(".search-form")!;
const locationInput =
  document.querySelector<HTMLInputElement>(".location-input")!;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await loadingSpinner();
    const weatherData = await getWeather(locationInput.value);
    console.log(weatherData);
    renderWeather(weatherData);
    locationInput.value = "";
  } catch (err) {
    showError(String(err));
  }
});

getLocalStorage();
