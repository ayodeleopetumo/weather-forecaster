import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

// Services
import { WeatherApiService } from '@core/services/weather-api.service';
import { Store } from '@core/store';
import { StoreTypes } from '@core/store/types';

// Models
import { CurrentWeather, Forecast } from '@core/models';

@Injectable({ providedIn: 'root' })
export class ForecastResolver implements Resolve<any> {
  constructor(private weatherApiService: WeatherApiService, private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<Forecast> {
    const city = route.params.city; // gets city name from route param
    let cityData: CurrentWeather = this.store.getSliceSnapshot(StoreTypes.CITIES)[city];

    if (!cityData) {
      // Get current weather data for specified city if it does not exist in store
      // To allow display of forecast data on refresh on the forecast page.
      cityData = await this.weatherApiService.getCurrentWeather(city).toPromise();
    }

    if (this.store.getSliceSnapshot(StoreTypes.FORECAST)[city]) {
      // If Forecast data already exists in store return it
      return this.store.getSliceSnapshot(StoreTypes.FORECAST)[city];
    }

    // else fetch from API
    return this.weatherApiService.getWeatherForecast({ ...cityData?.coord, name: cityData?.name }).toPromise();
  }
}
