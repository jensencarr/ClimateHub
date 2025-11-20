import "./css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import { getWeather, showError } from "./services/OWMAPI";

const searchForm = document.querySelector<HTMLFormElement>(".search-form")!;
const locationInput =
  document.querySelector<HTMLInputElement>(".location-input")!;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await getWeather(locationInput.value);
    locationInput.value = "";
  } catch (err) {
    showError(String(err));
  }
});

getWeather("batman");
