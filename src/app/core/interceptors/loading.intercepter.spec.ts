import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';

import { WeatherApiService } from '@core/services/weather-api.service';
import { environment } from '@env/environment';
import { MockStore } from 'mocks/services/store.mock';
import { Store } from '@core/store';
import { StoreTypes } from '@core/store/types';
import { currentWeatherFake } from 'mocks/fakes';

describe('AuthHttpInterceptor', () => {
  let store: MockStore;
  let weatherApiService: WeatherApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WeatherApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        }
      ]
    });

    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
    weatherApiService = TestBed.inject(WeatherApiService);
  });

  afterEach(() => {
    httpMock.verify();
    store.setInitialState();
  });

  it('should set appropriate value for loader in store', () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&appid=${environment.appID}`;
    weatherApiService.getCurrentWeather('Helsinki').subscribe(response => expect(response).toBeTruthy());

    expect(store.getSliceSnapshot(StoreTypes.LOADER)).toBeTruthy();

    const httpRequest = httpMock.expectOne(url);
    httpRequest.flush(currentWeatherFake);

    expect(store.getSliceSnapshot(StoreTypes.LOADER)).toBeFalsy();
  });
});
