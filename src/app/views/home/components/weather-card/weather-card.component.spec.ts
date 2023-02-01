import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WeatherCardComponent } from './weather-card.component';

import { SharedModule } from '@shared/shared.module';
import { currentWeatherFake } from 'mocks/fakes';

describe('CardsComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherCardComponent],
      imports: [SharedModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    component.cardData = currentWeatherFake;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render card with appropriate values', () => {
    const compiled = fixture.nativeElement;
    const cardHeader = compiled.querySelector('.mat-card-title').textContent;
    const cardImage = compiled.querySelector('.mat-card-image').src;
    const cardTemp = compiled.querySelector('.temp').textContent;

    expect(cardHeader).toEqual(component.cardData.name);
    expect(cardImage).toContain(`/assets/images/cities/${component.cardData.name.toLowerCase()}.jpeg`);
    expect(cardTemp).toEqual(`${component.cardData.main.temp} °C`);
  });
});
