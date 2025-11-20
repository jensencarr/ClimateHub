const BASE_URL: string = "https://api.openweathermap.org/data/2.5";
const API_KEY: string = "3f64a94b1ff47222d35924a8ee828d5f";

const alertWarning = document.querySelector<HTMLDivElement>(".alert-warning")!;

export const showError = (msg: string) => {
  alertWarning.classList.remove("d-none");
  alertWarning.textContent = msg;
  console.log(alertWarning.textContent);
};

const hideError = () => {
  alertWarning.textContent = "";
  alertWarning.classList.add("d-none");
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

  return data;
};
