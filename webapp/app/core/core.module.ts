import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { NavbarComponent } from './navbar/navbar.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import {AppRoutingModule} from '../modules/app-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [NavbarComponent, SpinnerComponent],
  declarations: [NavbarComponent, SpinnerComponent],
  providers: [LoggerService, SpinnerService]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
