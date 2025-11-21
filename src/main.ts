import "./css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  getWeather,
  showError,
  renderWeather,
  loadingSpinner,
} from "./services/OWMAPI";

const searchForm = document.querySelector<HTMLFormElement>(".search-form")!;
const locationInput =
  document.querySelector<HTMLInputElement>(".location-input")!;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await loadingSpinner();
    const weatherData = await getWeather(locationInput.value);
    renderWeather(weatherData);
    locationInput.value = "";
  } catch (err) {
    showError(String(err));
  }
});

const startPageData = await getWeather("malmö");
renderWeather(startPageData);
