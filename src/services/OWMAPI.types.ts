export interface WeatherData {
  name: string;
  main: { temp: number };
  sys: { country: string };
  dt: number;
  timezone: number;
}
