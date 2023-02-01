import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

// Store
import { Store } from '@core/store';
import { StoreTypes } from '@core/store/types';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0; // property to keep track of number of requests

  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.totalRequests++;
    this.store.set(StoreTypes.LOADER, true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          // Only return when number of request is zero;
          // To prevent multiple returned data due to multiple requests
          this.store.set(StoreTypes.LOADER, false);
        }
      })
    );
  }
}
