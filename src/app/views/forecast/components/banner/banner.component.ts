import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

// Models
import { CurrentWeather } from '@core/models';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {
  currentDate!: string;

  @Input() selectedCityData!: CurrentWeather;

  constructor() {}

  ngOnInit(): void {
    // Convert UNIX date to human-readable date string;
    this.currentDate = new Date(this.selectedCityData?.dt * 1000).toDateString();
  }
}
