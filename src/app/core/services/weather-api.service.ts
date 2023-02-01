import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Env
import { environment } from '@env/environment';

// Store
import { StoreTypes } from '@core/store/types';
import { Store } from '@core/store';

// Models
import { CurrentWeather, Forecast } from '@core/models';

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
  private readonly baseURL = environment.apiURL;
  private readonly appID = environment.appID;

  constructor(private httpClient: HttpClient, private store: Store) {}

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    // returns the current weather data from API
    return this.httpClient
      .get<CurrentWeather>(`${this.baseURL}/weather?q=${city}&units=metric&appid=${this.appID}`)
      .pipe(
        tap((cityData: CurrentWeather) => {
          const storageKey = cityData.name.toLowerCase();
          // Store response data in store
          this.store.set(StoreTypes.CITIES, {
            ...this.store.getSliceSnapshot(StoreTypes.CITIES),
            [storageKey]: cityData
          });
        })
      );
  }

  getWeatherForecast({ lat, lon, name }: { lat: number; lon: number; name: string }): Observable<Forecast> {
    // returns the current weather forecast data from API
    return this.httpClient
      .get<Forecast>(
        `${this.baseURL}/onecall?lat=${lat}&lon=${lon}&exclude=daily,current,minutely,alerts&units=metric&appid=${this.appID}`
      )
      .pipe(
        tap(forecastData => {
          // Store response data in store
          this.store.set(StoreTypes.FORECAST, {
            ...this.store.getSliceSnapshot(StoreTypes.FORECAST),
            [name.toLowerCase()]: forecastData
          });
        })
      );
  }
}
