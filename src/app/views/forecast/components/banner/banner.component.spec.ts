import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { SharedModule } from '@shared/shared.module';

import { currentWeatherFake } from 'mocks/fakes';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerComponent],
      imports: [SharedModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    component.selectedCityData = currentWeatherFake;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain necessary information based on input', () => {
    const compiled = fixture.nativeElement;

    const cardHeader = compiled.querySelector('.banner-card__heading').textContent;
    const cardCity = compiled.querySelector('.banner-card__city-name').textContent;
    const cardWeatherDesc = compiled.querySelector('.banner-card__weather-desc').textContent;
    const cardTempText = compiled.querySelector('.banner-card__temp-text').textContent;

    expect(cardHeader).toEqual(`Current Weather - ${new Date(component.selectedCityData.dt * 1000).toDateString()}`);
    expect(cardCity).toEqual(component.selectedCityData.name);
    expect(cardWeatherDesc).toEqual(convertToTitleCase(component.selectedCityData.weather[0]?.description));
    expect(cardTempText).toEqual(`${component.selectedCityData.main.temp} °C`);
  });
});

const convertToTitleCase = (word: string): string => {
  return word
    .split(' ')
    .map(text => text[0].toUpperCase() + text.substring(1))
    .join(' ');
};
