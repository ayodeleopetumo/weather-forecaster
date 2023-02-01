import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { HomeComponent } from './home.component';

import { WeatherApiService } from '@core/services/weather-api.service';
import { Store } from '@core/store';
import { StoreTypes } from '@core/store/types';

import { MockStore } from 'mocks/services/store.mock';
import { currentWeatherFake } from 'mocks/fakes';
import { CurrentWeather } from '@core/models';
import { MockErrorComponent } from 'mocks/components';

describe('HomeComponent', () => {
  let store: MockStore;
  let weatherApiService: WeatherApiService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cityData: { [key: string]: CurrentWeather };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockErrorComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: Store, useClass: MockStore }]
    }).compileComponents();

    store = TestBed.inject(Store);
    weatherApiService = TestBed.inject(WeatherApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cityData = {
      barcelona: { ...currentWeatherFake, name: 'Barcelona' },
      paris: { ...currentWeatherFake, name: 'Paris' },
      prague: { ...currentWeatherFake, name: 'Prague' },
      helsinki: currentWeatherFake,
      amsterdam: { ...currentWeatherFake, name: 'Amsterdam' }
    };
  });

  afterEach(() => {
    store.setInitialState();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAvailableCitiesWeather()', () => {
    it('should return cities weather data from store if available', () => {
      const getSliceSnapshotSpy = spyOn(store, 'getSliceSnapshot').and.callThrough();
      store.set(StoreTypes.CITIES, cityData);

      component.getAvailableCitiesWeather();

      expect(getSliceSnapshotSpy).toHaveBeenCalledWith(StoreTypes.CITIES);
      expect(component.availableCities).toEqual(Object.values(cityData).sort(component.compare));
    });

    it('should hit the api service for data if not found in store', () => {
      const returnValues = [
        of(cityData.amsterdam),
        of(cityData.barcelona),
        of(cityData.helsinki),
        of(cityData.paris),
        of(cityData.prague)
      ];
      spyOn(weatherApiService, 'getCurrentWeather').and.returnValues(...returnValues);

      component.getAvailableCitiesWeather();

      expect(weatherApiService.getCurrentWeather).toHaveBeenCalledTimes(5);
      expect(component.availableCities).toEqual(Object.values(cityData).sort(component.compare));
    });

    it('should show error component if on request fails', () => {
      const returnValues = [
        of(cityData.amsterdam),
        of(cityData.barcelona),
        of(cityData.helsinki),
        of(cityData.paris),
        throwError('Oops! Error loading weather - intentional error')
      ];

      spyOn(weatherApiService, 'getCurrentWeather').and.returnValues(...returnValues);

      component.getAvailableCitiesWeather();
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const errorComponentMessage = compiled.querySelector('app-error').textContent;

      expect(errorComponentMessage).toEqual('Oops! Error loading weather - intentional error');
      expect(weatherApiService.getCurrentWeather).toHaveBeenCalledTimes(5);
      expect(component.isError).toEqual('Oops! Error loading weather - intentional error');
    });
  });

  describe('compare()', () => {
    it('should should return appropriate values', () => {
      const valuesToCompare = [{ name: 'b' }, { name: 'a' }];
      expect(component.compare(valuesToCompare[0], valuesToCompare[1])).toEqual(1);
      expect(component.compare(valuesToCompare[1], valuesToCompare[0])).toEqual(-1);
      expect(component.compare(valuesToCompare[1], valuesToCompare[1])).toEqual(0);
    });
  });
});
