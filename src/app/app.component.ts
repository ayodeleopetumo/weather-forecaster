import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

// Store
import { StoreTypes } from '@core/store/types';
import { Store } from '@core/store';

// Env
import { environment } from '@env/environment';
import { delay, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading!: any;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Observable to fetch and control loading component set from interceptors
    this.store
      .select(StoreTypes.LOADER)
      ?.pipe(startWith(true), delay(0))
      .subscribe(status => (this.loading = status));

    // Timer to clear store and force reload on next interaction
    timer(0, environment.refresh_interval).subscribe(() => this.store.setInitialState());
  }
}
