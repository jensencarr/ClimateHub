import type { WeatherData, LonLatData } from "./OWMAPI.types";

const BASE_URL: string = "https://api.openweathermap.org/data/2.5";
const API_KEY: string = "3f64a94b1ff47222d35924a8ee828d5f";

const alertWarning = document.querySelector<HTMLDivElement>(".alert-warning")!;
const dateContainer =
  document.querySelector<HTMLHeadingElement>(".date-container")!;
const timeContainer =
  document.querySelector<HTMLHeadingElement>(".time-container")!;
const cityAndCountry = document.querySelector<HTMLHeadingElement>(
  ".city-country-header"
)!;
const loadingContainer =
  document.querySelector<HTMLDivElement>(".loading-container")!;
const weatherNowImage =
  document.querySelector<HTMLImageElement>(".weather-now-image")!;

export const showError = (msg: string) => {
  loadingContainer.classList.add("d-none");
  alertWarning.classList.remove("d-none");
  alertWarning.textContent = msg;
  console.log(alertWarning.textContent);
};

const hideError = () => {
  alertWarning.textContent = "";
  alertWarning.classList.add("d-none");
};

export const loadingSpinner = async () => {
  hideError();

  timeContainer.textContent = "";
  dateContainer.textContent = "";
  cityAndCountry.textContent = "";
  loadingContainer.classList.remove("d-none");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });
};

export const getCurrentWeather = async (city: string) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.status + " " + response.statusText);
  }

  const data = await response.json();

  const filteredData: WeatherData = {
    name: data.name,
    main: { temp: data.main.temp },
    sys: { country: data.sys.country },
    dt: data.dt,
    timezone: data.timezone,
    coord: { lon: data.coord.lon, lat: data.coord.lat },
    weather: data.weather,
  };

  return filteredData;
};

export const renderWeather = async (data: WeatherData) => {
  const tempNow = document.querySelector<HTMLHeadingElement>(".temp-now")!;

  const localTime = (data.dt + data.timezone) * 1000;
  const localDate = new Date(localTime);

  const date = localDate.toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = localDate.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const weatherIcon = data.weather[0].icon;

  saveLocalStoage(data);
  console.log(`lon: ${data.coord.lon} lat: ${data.coord.lat}`);
  await getForecastWeather(data.coord.lon, data.coord.lat);

  loadingContainer.classList.add("d-none");

  weatherNowImage.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  tempNow.textContent = String(Math.round(data.main.temp)) + "°C";
  cityAndCountry.textContent = `${data.name}, ${data.sys.country}`;
  dateContainer.textContent = `${date}`;
  timeContainer.textContent = `${time}`;
};
const saveLocalStoage = (data: WeatherData) => {
  const stringData = JSON.stringify(data);
  localStorage.setItem("location", stringData);
};

export const getLocalStorage = async () => {
  try {
    const data = localStorage.getItem("location");

    if (!data) {
      const defaultData = await getCurrentWeather("malmö");
      renderWeather(defaultData);
      return;
    }

    const parsedData = JSON.parse(data);
    const fetchedData = await getCurrentWeather(parsedData.name);
    renderWeather(fetchedData);
  } catch (err) {
    showError(String(err));
  }
};

const getForecastWeather = async (lon: number, lat: number) => {
  const response = await fetch(
    `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
  );
  console.log(response);

  if (!response.ok) {
    throw new Error(response.status + " " + response.statusText);
  }
  const data = await response.json();
  console.log("Forecast:", data);
};
