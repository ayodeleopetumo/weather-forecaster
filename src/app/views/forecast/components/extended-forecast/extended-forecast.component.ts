import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

// Models
import { Forecast, HourlyForecast } from '@core/models';

// Env
import { environment } from '@env/environment';

const FORECAST_SIZE = environment.forecast_size;

@Component({
  selector: 'app-extended-forecast',
  templateUrl: './extended-forecast.component.html',
  styleUrls: ['./extended-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedForecastComponent implements OnInit {
  forecastReduced!: HourlyForecast[];

  @Input() forecastData!: Forecast;

  constructor() {}

  ngOnInit(): void {
    // Pick the first 6 hours from forecast data;
    this.forecastReduced = this.forecastData.hourly.slice(0, FORECAST_SIZE + 1);
  }
}
