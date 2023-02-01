import { CurrentWeather } from '@core/models';

export const currentWeatherFake: CurrentWeather = {
  coord: {
    lon: 24.9355,
    lat: 60.1695
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01n'
    }
  ],
  base: 'stations',
  main: {
    temp: 2.49,
    feels_like: -0.14,
    temp_min: 1.67,
    temp_max: 3.33,
    pressure: 1011,
    humidity: 80
  },
  visibility: 10000,
  wind: {
    speed: 2.57,
    deg: 300
  },
  clouds: {
    all: 0
  },
  dt: 1619553474,
  sys: {
    type: 1,
    id: 1332,
    country: 'FI',
    sunrise: 1619490478,
    sunset: 1619546852
  },
  timezone: 10800,
  id: 658225,
  name: 'Helsinki',
  cod: 200
};
