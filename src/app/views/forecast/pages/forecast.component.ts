import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Store
import { StoreTypes } from '@core/store/types';
import { Store } from '@core/store';

// Models
import { CurrentWeather, Forecast } from '@core/models';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit, OnDestroy {
  cityForecast!: Forecast;
  currentCity!: string;
  currentCityData!: CurrentWeather;
  isError: any;

  private readonly destroyed$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    // Get resolved forecast data from route resolver
    this.activatedRoute.data.pipe(takeUntil(this.destroyed$)).subscribe(
      data => (this.cityForecast = data.forecast),
      error => (this.isError = error)
    );
    this.currentCity = this.activatedRoute.snapshot.url[1].path;
    this.currentCityData = this.store.getSliceSnapshot(StoreTypes.CITIES)[this.currentCity];
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
