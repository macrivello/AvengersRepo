import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdSidenavModule} from '@angular/material';


import { LoggerService } from './logger.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { NavbarComponent } from './navbar/navbar.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import {AppRoutingModule} from '../modules/app-routing.module';
import {CourseSearchComponent} from "../components/course-search/course-search.component";
import {CourseSearchService} from "../services/course-search/course-search.service";


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MdSidenavModule
  ],
  exports: [NavbarComponent, SpinnerComponent, LeftSideBarComponent, CourseSearchComponent],
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    LeftSideBarComponent,
    CourseSearchComponent
  ],
  providers: [LoggerService, SpinnerService]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
