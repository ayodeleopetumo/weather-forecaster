import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './pages/forecast.component';
import { BannerComponent } from './components/banner/banner.component';

// Modules
import { SharedModule } from '@shared/shared.module';
import { ExtendedForecastComponent } from './components/extended-forecast/extended-forecast.component';
import { ExtendedForecastCardComponent } from './components/extended-forecast-card/extended-forecast-card.component';

@NgModule({
  declarations: [ForecastComponent, BannerComponent, ExtendedForecastComponent, ExtendedForecastCardComponent],
  imports: [CommonModule, SharedModule, ForecastRoutingModule]
})
export class ForecastModule {}
