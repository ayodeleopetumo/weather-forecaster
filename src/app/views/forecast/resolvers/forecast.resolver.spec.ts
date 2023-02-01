import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { ForecastResolver } from './forecast.resolver';
import { WeatherApiService } from '@core/services/weather-api.service';
import { Store } from '@core/store';
import { StoreTypes } from '@core/store/types';

// Mocks
import { MockStore } from 'mocks/services/store.mock';
import { currentWeatherFake, forecastWeatherFake } from 'mocks/fakes';

describe('ForecastResolver', () => {
  let store: MockStore;
  let forecastResolver: ForecastResolver;

  const mockWeatherApiService = jasmine.createSpyObj('WeatherApiService', ['getCurrentWeather', 'getWeatherForecast']);
  const routeData = { params: { city: 'helsinki' } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ForecastResolver,
        { provide: WeatherApiService, useValue: mockWeatherApiService },
        { provide: Store, useClass: MockStore },
        { provide: ActivatedRouteSnapshot, useValue: routeData }
      ]
    });

    store = TestBed.inject(Store);
    forecastResolver = TestBed.inject(ForecastResolver);
  });

  afterEach(() => {
    store.setInitialState();
  });

  it('should be created', () => {
    expect(forecastResolver).toBeTruthy();
  });

  describe('resolve()', () => {
    it('should return forecast data from store if it exists', (done: DoneFn) => {
      const getSnapShotSpy = spyOn(store, 'getSliceSnapshot').and.callThrough();
      store.set(StoreTypes.CITIES, { helsinki: currentWeatherFake });
      store.set(StoreTypes.FORECAST, { helsinki: forecastWeatherFake });

      forecastResolver.resolve(routeData as any).then(value => {
        expect(getSnapShotSpy).toHaveBeenCalled();
        expect(value).toEqual(forecastWeatherFake);
        done();
      });
    });

    it('should return server data if store is empty', () => {
      store.set(StoreTypes.CITIES, { helsinki: currentWeatherFake });
      mockWeatherApiService.getWeatherForecast.and.returnValue(of(forecastWeatherFake));

      forecastResolver.resolve(routeData as any).then(value => {
        expect(value).toEqual(forecastWeatherFake);
      });
      expect(mockWeatherApiService.getWeatherForecast).toHaveBeenCalledWith({
        lon: 24.9355,
        lat: 60.1695,
        name: 'Helsinki'
      });
    });
  });

  it('should fetch city weather data is it doesn\'t exist in store', () => {
    mockWeatherApiService.getCurrentWeather.and.returnValue(of(currentWeatherFake));
    mockWeatherApiService.getWeatherForecast.and.returnValue(of(forecastWeatherFake));

    routeData.params.city = 'barcelona';

    forecastResolver.resolve(routeData as any);

    expect(mockWeatherApiService.getCurrentWeather).toHaveBeenCalledTimes(1);
    expect(mockWeatherApiService.getCurrentWeather).toHaveBeenCalledWith('barcelona');
  });
});
