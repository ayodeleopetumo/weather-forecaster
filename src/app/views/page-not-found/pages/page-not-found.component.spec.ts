import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { PageNotFoundComponent } from './page-not-found.component';
import { MockAppComponent } from 'mocks/components/app.component.mock';
import { MockTestComponent } from 'mocks/components/test.component.mock';
import { By } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'test-route',
    pathMatch: 'full'
  },
  {
    path: 'test-route',
    component: MockTestComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

describe('PageNotFoundComponent', () => {
  let router: Router;
  let component: MockAppComponent;
  let fixture: ComponentFixture<MockAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockAppComponent, MockTestComponent, PageNotFoundComponent],
      imports: [RouterTestingModule.withRoutes(routes)]
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(MockAppComponent);
    component = fixture.componentInstance;
    fixture.ngZone?.run(() => router.initialNavigation());

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 page when route does not exist', fakeAsync(() => {
    const compiled = fixture.nativeElement;
    fixture.ngZone?.run(() => router.navigate(['/non-existent-route']));
    tick();

    const paragraphElement = compiled.querySelector('.page-not-found__text');
    const paragraphText = 'The page you\'re looking for does not exist here.';

    expect(paragraphElement.textContent).toEqual(paragraphText);
  }));

  it('should navigate to home when return home is clicked', fakeAsync(() => {
    fixture.ngZone?.run(() => router.navigate(['/non-existent-route']));
    tick();

    fixture.debugElement.query(By.css('a')).nativeElement.click();
    tick();
    const paragraphText = fixture.nativeElement.querySelector('p');
    expect(paragraphText.textContent).toEqual('This is a Test component');
  }));
});
