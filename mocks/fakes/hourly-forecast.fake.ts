import { HourlyForecast } from '@core/models';

export const hourlyForecastFake: HourlyForecast = {
  dt: 1619636400,
  temp: 15.36,
  feels_like: 15.17,
  pressure: 1007,
  humidity: 85,
  dew_point: 12.85,
  uvi: 0,
  clouds: 52,
  visibility: 10000,
  wind_speed: 1.39,
  wind_deg: 120,
  wind_gust: 1.37,
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04n'
    }
  ],
  pop: 0.15
};
