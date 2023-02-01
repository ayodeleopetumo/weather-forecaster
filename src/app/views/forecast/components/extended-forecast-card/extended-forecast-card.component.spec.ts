import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedForecastCardComponent } from './extended-forecast-card.component';
import { SharedModule } from '@shared/shared.module';

import { hourlyForecastFake } from 'mocks/fakes';

describe('ExtendedForecastCardComponent', () => {
  let component: ExtendedForecastCardComponent;
  let fixture: ComponentFixture<ExtendedForecastCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedForecastCardComponent],
      imports: [SharedModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedForecastCardComponent);
    component = fixture.componentInstance;
    component.forecast = hourlyForecastFake;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should contain various data', () => {
    const compiled = fixture.nativeElement;

    const cardHeader = compiled.querySelector('.mat-card-header');
    const cardTemp = compiled.querySelector('.extended-forecast-card__temp-text');
    const cardHumidity = compiled.querySelector('.humidity');

    const date = new Date(component.forecast?.dt * 1000);
    const dateString = `${date.toDateString()} – ${date.toLocaleTimeString()}`;
    const temp = `${component.forecast.temp} °C`;
    const humidity = `Humidity ${component.forecast.humidity}%`;

    expect(cardHeader.textContent).toEqual(dateString);
    expect(cardTemp.textContent).toEqual(temp);
    expect(cardHumidity.textContent).toEqual(humidity);
  });
});
