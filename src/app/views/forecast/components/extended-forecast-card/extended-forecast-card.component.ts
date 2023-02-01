import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

// Models
import { HourlyForecast } from '@core/models';

@Component({
  selector: 'app-extended-forecast-card',
  templateUrl: './extended-forecast-card.component.html',
  styleUrls: ['./extended-forecast-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedForecastCardComponent implements OnInit {
  forecastDate!: string;

  @Input() forecast!: HourlyForecast;

  constructor() {}

  ngOnInit(): void {
    const convertedDate = new Date(this.forecast?.dt * 1000); // multiplied by 1000 to convert to milliseconds;
    // Get the date and time from the converted date above
    this.forecastDate = `${convertedDate.toDateString()} – ${convertedDate.toLocaleTimeString()}`;
  }
}
