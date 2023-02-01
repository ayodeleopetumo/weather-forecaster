import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StoreTypes } from '@core/store/types';
import { map } from 'rxjs/operators';
import { Forecast } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class Store {
  storeMap: Map<string, BehaviorSubject<any>> = new Map();
  snapShot: { [key: string]: any } = {};

  constructor() {
    this.setInitialState();
  }

  // return one time value for specified key
  getSliceSnapshot(key = ''): any {
    if (this.storeMap.has(key)) {
      return this.storeMap.get(key)?.value;
    } else {
      return null;
    }
  }

  // Creates stream that any component can subscribe to for live data update
  select<T>(name: string): Observable<T> | undefined {
    if (!this.storeMap.has(name)) {
      // @ts-ignore
      this.storeMap.set(name, new BehaviorSubject<T>(null));
    }
    return this.storeMap.get(name)?.pipe(map(data => data as T));
  }

  // update store or create new entry if name key not found
  set<T>(name: string, state: any): void {
    if (this.storeMap.has(name)) {
      this.storeMap.get(name)?.next(state);
    } else {
      this.storeMap.set(name, new BehaviorSubject<T>(state));
    }

    this.snapShot[name] = state;
  }

  setInitialState(): void {
    this.set<{ [key: string]: string }>(StoreTypes.CITIES, {});
    this.set<Forecast>(StoreTypes.FORECAST, {});
  }
}
