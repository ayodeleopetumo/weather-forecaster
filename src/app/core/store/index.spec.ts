import { StoreTypes } from './types';
import { Store } from '@core/store';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

describe('Store', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Store]
    });
    store = TestBed.inject(Store);
  });

  const cities = {
    barcelona: '1234'
  };

  describe('getSliceSnapshot()', () => {
    it('should return the user slice', () => {
      store.set(StoreTypes.CITIES, cities);
      const snapShot = store.getSliceSnapshot(StoreTypes.CITIES);

      expect(snapShot.barcelona).toEqual('1234');
    });

    it('should return null when there is no entry', () => {
      const snapShot = store.getSliceSnapshot('test');
      expect(snapShot).toBeFalsy();
    });
  });

  describe('set()', () => {
    it('should create a key if none is there', () => {
      const mapSetSpy = spyOn<any>(store.storeMap, 'set');
      store.set('test', { a: 1, b: 2, c: 'test' });

      expect(mapSetSpy).toHaveBeenCalledTimes(1);
      expect(mapSetSpy).toHaveBeenCalledWith('test', new BehaviorSubject({ a: 1, b: 2, c: 'test' }));
    });

    it('should update a key if one is there', fakeAsync(() => {
      const mapGetSpy = spyOn<any>(store.storeMap, 'get').and.callThrough();
      store.set('test', { a: 1, b: 2, c: 'test' });
      tick();
      store.set('test', { foo: 'bar' });
      expect(mapGetSpy).toHaveBeenCalledTimes(1);
      expect(mapGetSpy).toHaveBeenCalledWith('test');
    }));
  });

  describe('select()', () => {
    it('should get user information from subscription', () => {
      store.set(StoreTypes.CITIES, cities);
      store.select<{ [key: string]: string }>(StoreTypes.CITIES)?.subscribe(value => {
        expect(value).toBeTruthy();
        expect(store.getSliceSnapshot(StoreTypes.CITIES).barcelona).toEqual('1234');
      });
    });

    it('should create a key if none is there', () => {
      const mapSetSpy = spyOn<any>(store.storeMap, 'set').and.callFake(() => {});

      store.select<{ [key: string]: string }>('none-existence-key')?.subscribe(value => {
        expect(value).toBeFalsy();
      });

      expect(mapSetSpy).toHaveBeenCalledTimes(1);
      expect(mapSetSpy).toHaveBeenCalledWith('none-existence-key', new BehaviorSubject(null));
    });
  });
});
