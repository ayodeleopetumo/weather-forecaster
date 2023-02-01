import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// Model
import { CurrentWeather } from '@core/models';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent {
  @Input() cardData!: CurrentWeather;
}
