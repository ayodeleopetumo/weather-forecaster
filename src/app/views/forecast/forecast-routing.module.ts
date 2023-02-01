import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ForecastComponent } from './pages/forecast.component';

// Resolvers
import { ForecastResolver } from '@views/forecast/resolvers/forecast.resolver';

const routes: Routes = [
  {
    path: 'forecasts/:city',
    component: ForecastComponent,
    resolve: { forecast: ForecastResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForecastRoutingModule {}
