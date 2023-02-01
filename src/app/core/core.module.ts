import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Module Import Guard
import { throwIfAlreadyLoaded } from './guards/module-import.guard';

// Store
import { Store } from '@core/store';

@NgModule({
  imports: [HttpClientModule],
  providers: [Store]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
