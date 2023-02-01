import { Forecast } from '@core/models';

export const forecastWeatherFake: Forecast = {
  lat: 33.44,
  lon: -94.04,
  timezone: 'America/Chicago',
  timezone_offset: -18000,
  hourly: [
    {
      dt: 1619560800,
      temp: 297.45,
      feels_like: 297.74,
      pressure: 1013,
      humidity: 69,
      dew_point: 291.4,
      uvi: 1.45,
      clouds: 75,
      visibility: 10000,
      wind_speed: 4.51,
      wind_deg: 188,
      wind_gust: 9.56,
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d'
        }
      ],
      pop: 0
    },
    {
      dt: 1619564400,
      temp: 297.25,
      feels_like: 297.6,
      pressure: 1013,
      humidity: 72,
      dew_point: 291.89,
      uvi: 0.59,
      clouds: 80,
      visibility: 10000,
      wind_speed: 3.43,
      wind_deg: 176,
      wind_gust: 8.15,
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d'
        }
      ],
      pop: 0.01
    },
    {
      dt: 1619568000,
      temp: 296.59,
      feels_like: 297,
      pressure: 1013,
      humidity: 77,
      dew_point: 292.33,
      uvi: 0.15,
      clouds: 85,
      visibility: 10000,
      wind_speed: 3.26,
      wind_deg: 195,
      wind_gust: 8.28,
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d'
        }
      ],
      pop: 0.37
    }
  ]
};
