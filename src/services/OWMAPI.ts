import type { WeatherData } from "./OWMAPI.types";

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

export const showError = (msg: string) => {
  alertWarning.classList.remove("d-none");
  alertWarning.textContent = msg;
  console.log(alertWarning.textContent);
};

const hideError = () => {
  alertWarning.textContent = "";
  alertWarning.classList.add("d-none");
};

export const loadingSpinner = async () => {
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

export const getWeather = async (city: string) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.status + " " + response.statusText);
  }

  hideError();
  const data = await response.json();

  console.log(data);

  const filteredData: WeatherData = {
    name: data.name,
    main: { temp: data.main.temp },
    sys: { country: data.sys.country },
    dt: data.dt,
    timezone: data.timezone,
  };

  return filteredData;
};

export const renderWeather = (data: WeatherData) => {
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

  loadingContainer.classList.add("d-none");

  tempNow.textContent = String(Math.round(data.main.temp)) + "°C";
  cityAndCountry.textContent = `${data.name}, ${data.sys.country}`;
  dateContainer.textContent = `${date}`;
  timeContainer.textContent = `${time}`;
};
