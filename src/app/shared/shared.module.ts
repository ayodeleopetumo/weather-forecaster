import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material UI Library
import { MaterialUiModule } from './ui';

// Components
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorComponent } from '@shared/components/error/error.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent, ErrorComponent],
  exports: [CommonModule, MaterialUiModule, HeaderComponent, FooterComponent, LoaderComponent, ErrorComponent],
  imports: [CommonModule, MaterialUiModule, RouterModule]
})
export class SharedModule {}
