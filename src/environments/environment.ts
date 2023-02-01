export const environment = {
  production: false,
  apiURL: 'https://api.openweathermap.org/data/2.5', // OpenWeather api url
  appID: '596e3ef7e045d7ccc8cf4e9b3caa7ab3', // OpenWeather app id to allow for weather requests
  forecast_size: 6, // Number of hours to show a city forecast for
  refresh_interval: 600000 // Milliseconds (10 minutes)
};
