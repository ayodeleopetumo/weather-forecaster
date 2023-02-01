import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { ExtendedForecastComponent } from './extended-forecast.component';
import { ExtendedForecastCardComponent } from '@views/forecast/components/extended-forecast-card/extended-forecast-card.component';

// Modules
import { SharedModule } from '@shared/shared.module';

// Fakes
import { forecastWeatherFake } from 'mocks/fakes';

describe('ExtendedForecastComponent', () => {
  let component: ExtendedForecastComponent;
  let fixture: ComponentFixture<ExtendedForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedForecastComponent, ExtendedForecastCardComponent],
      imports: [SharedModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedForecastComponent);
    component = fixture.componentInstance;
    component.forecastData = forecastWeatherFake;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render appropriate data based on input', () => {
    const compiled = fixture.nativeElement;

    const pageSubtitle = compiled.querySelector('.extended-forecast__heading').textContent;
    const extendedForecastCardComponents = compiled.querySelectorAll('app-extended-forecast-card').length;

    expect(pageSubtitle).toEqual('Extended Forecast - next 6 hours');
    expect(extendedForecastCardComponents).toBe(3);
    expect(component.forecastReduced.length).toBe(3);
  });
});
