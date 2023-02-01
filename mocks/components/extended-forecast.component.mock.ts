import { Component, Input } from '@angular/core';

import { Forecast } from '@core/models';

@Component({
  selector: 'app-extended-forecast',
  template: '<p>Test Extended Forecast</p>'
})
export class MockExtendedForecastComponent {
  @Input() forecastData!: Forecast;
}
