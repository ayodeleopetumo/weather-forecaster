import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Component
import { ForecastComponent } from './forecast.component';

import { Store } from '@core/store';
import { StoreTypes } from '@core/store/types';

// Mocks
import { MockStore } from 'mocks/services/store.mock';
import { MockBannerComponent, MockExtendedForecastComponent } from 'mocks/components';
import { currentWeatherFake, forecastWeatherFake } from 'mocks/fakes';

describe('ForecastComponent', () => {
  let store: MockStore;
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let getSnapShotSpy: any;
  let override: ActivatedRoute;

  const mockActivatedData = {
    data: of({ forecast: forecastWeatherFake }),
    snapshot: {
      url: [{ path: 'forecast' }, { path: 'helsinki' }]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastComponent, MockExtendedForecastComponent, MockBannerComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedData },
        { provide: Store, MockStore }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    override = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    getSnapShotSpy = spyOn(store, 'getSliceSnapshot').and.callThrough();
    store.set(StoreTypes.CITIES, { helsinki: currentWeatherFake });

    component.isError = false;
    fixture.detectChanges();
    component.ngOnInit();
  });

  afterEach(() => {
    store.setInitialState();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should fetch populate necessary data on component initialisation', () => {
      expect(component.cityForecast).toEqual(forecastWeatherFake);
      expect(component.currentCity).toEqual('helsinki');
      expect(component.currentCityData).toEqual(currentWeatherFake);
      expect(getSnapShotSpy).toHaveBeenCalled();
    });

    it('should display necessary components when data is available', () => {
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('app-banner')).toBeTruthy();
      expect(compiled.querySelector('app-extended-forecast')).toBeTruthy();
    });
  });
});
