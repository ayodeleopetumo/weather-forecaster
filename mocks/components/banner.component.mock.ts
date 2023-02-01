import { Component, Input } from '@angular/core';

import { CurrentWeather } from '@core/models';

@Component({
  selector: 'app-banner',
  template: `<p>This is test banner component</p>`
})
export class MockBannerComponent {
  @Input() selectedCityData!: CurrentWeather;
}
