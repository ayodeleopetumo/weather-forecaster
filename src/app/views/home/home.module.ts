import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeComponent } from './pages/home.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';

// Modules
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [HomeComponent, WeatherCardComponent],
  exports: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
