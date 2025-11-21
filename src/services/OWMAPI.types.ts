export interface WeatherData {
  name: string;
  main: { temp: number };
  sys: { country: string };
  dt: number;
  timezone: number;
  coord: { lon: number; lat: number };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

export interface LonLatData {
  coord: { lon: number; lat: number };
}
