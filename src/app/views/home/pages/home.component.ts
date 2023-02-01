import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, Subject } from 'rxjs';

// Enums
import { Cities } from '@core/enums';

// Services
import { Store } from '@core/store';
import { WeatherApiService } from '@core/services/weather-api.service';

// Models
import { StoreTypes } from '@core/store/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  availableCities!: any;
  isError!: any;

  /** Emits when the component is destroyed. */
  private readonly destroyed$ = new Subject<void>();

  constructor(private weatherApiService: WeatherApiService, private store: Store) {}

  ngOnInit(): void {
    this.getAvailableCitiesWeather();
  }

  getAvailableCitiesWeather(): void {
    if (Object.keys(this.store.getSliceSnapshot(StoreTypes.CITIES)).length === 5) {
      this.availableCities = Object.values(this.store.getSliceSnapshot(StoreTypes.CITIES)).sort(this.compare);
    } else {
      // Converts the Cities enum into arrays with its values
      // and sends each one into the WeatherApiService to retrieve data
      const getCities$: Observable<any>[] = Object.values(Cities)
        .sort()
        .map(city => this.weatherApiService.getCurrentWeather(city));

      // Emits once all API call is successful else error - behaves just like Promise.all
      forkJoin(getCities$)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(
          cities => (this.availableCities = cities),
          error => (this.isError = error)
        );
    }
  }

  // Function to return sorted city data
  compare(a: any, b: any): 1 | -1 | 0 {
    const nameA = a?.name?.toUpperCase();
    const nameB = b?.name?.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  ngOnDestroy(): void {
    // Unsubscribes from observables when component is destroyed
    // to avoid memory leak
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
