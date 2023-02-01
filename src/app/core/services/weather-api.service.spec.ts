import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

// Services
import { WeatherApiService } from './weather-api.service';
import { Store } from '@core/store';
import { StoreTypes } from '@core/store/types';

// Models
import { CurrentWeather, Forecast } from '@core/models';

// Mocks
import { MockStore } from 'mocks/services/store.mock';
import { currentWeatherFake, forecastWeatherFake } from 'mocks/fakes';

// Env
import { environment } from '@env/environment';

describe('WeatherApiService', () => {
  let weatherApiService: WeatherApiService;
  let httpMock: HttpTestingController;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [WeatherApiService, { provide: Store, useClass: MockStore }]
      });

      weatherApiService = TestBed.inject(WeatherApiService);
      httpMock = TestBed.inject(HttpTestingController);
      store = TestBed.inject(Store);
    })
  );

  afterEach(() => {
    httpMock.verify();
    store.setInitialState();
  });

  describe('getCurrentWeather()', () => {
    it('should get current weather from URL', () => {
      const testData: CurrentWeather = currentWeatherFake;
      const storeSpy = spyOn(store, 'set');
      spyOn(store, 'getSliceSnapshot').and.returnValue({ helsinki: testData });

      weatherApiService.getCurrentWeather('Helsinki').subscribe((data: CurrentWeather) => {
        expect(data).toEqual(testData);
        expect(data.name).toBe('Helsinki');
        expect(storeSpy).toHaveBeenCalledWith(StoreTypes.CITIES, { helsinki: testData });
        expect(store.getSliceSnapshot(StoreTypes.CITIES)).toEqual({ helsinki: testData });
      });

      const req = httpMock.expectOne(
        `${environment.apiURL}/weather?q=Helsinki&units=metric&appid=${environment.appID}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(testData);
    });
  });

  describe('getWeatherForecast()', () => {
    it('should get weather forecasts from URL', () => {
      const testData: Forecast = forecastWeatherFake;
      const storeSpy = spyOn(store, 'set');
      spyOn(store, 'getSliceSnapshot').and.returnValue({ helsinki: testData });

      weatherApiService.getWeatherForecast({ lat: 0, lon: 0, name: 'helsinki' }).subscribe((data: Forecast) => {
        expect(data).toEqual(testData);
        expect(data.hourly.length).toBe(3);
        expect(storeSpy).toHaveBeenCalledWith(StoreTypes.FORECAST, { helsinki: testData });
        expect(store.getSliceSnapshot(StoreTypes.FORECAST)).toEqual({ helsinki: testData });
      });

      const req = httpMock.expectOne(
        `${environment.apiURL}/onecall?lat=0&lon=0&exclude=daily,current,minutely,alerts&units=metric&appid=${environment.appID}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(testData);
    });
  });
});
