import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

import { SharedModule } from '@shared/shared.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title with current date', () => {
    const compiled = fixture.nativeElement;

    component.currentDate = new Date('2/5/2018').toDateString();
    fixture.detectChanges();

    expect(compiled.querySelector('.header span').textContent).toContain('Weather Forecasts - Mon Feb 05 2018');
  });
});
