import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { SharedModule } from '@shared/shared.module';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      imports: [SharedModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Loader Text', () => {
    it('should contain default text', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('mat-spinner')).toBeTruthy();
      expect(compiled.querySelector('.loader__text').textContent).toContain('Please, wait');
    });

    it('should contain passed in text', () => {
      const compiled = fixture.nativeElement;

      component.loaderText = 'Loading weather forecast...';
      fixture.detectChanges();

      expect(compiled.querySelector('mat-spinner')).toBeTruthy();
      expect(compiled.querySelector('.loader__text').textContent).toContain('Loading weather forecast...');
    });
  });
});
