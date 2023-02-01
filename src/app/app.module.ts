import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from '@views/page-not-found/pages/page-not-found.component';

// Modules
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { HomeModule } from '@views/home/home.module';
import { ForecastModule } from '@views/forecast/forecast.module';

// HTTP Interceptor
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ForecastModule,
    AppRoutingModule
  ],
  // Catch all HTTP requests and update store to cater for loading component
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
