import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdDialog, MdDialogModule, MdSidenavModule} from '@angular/material';


import { LoggerService } from './logger.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { NavbarComponent } from './navbar/navbar.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SideNavComponent } from './sidenav/sidenav.component';
import {AppRoutingModule} from '../modules/app-routing.module';
import {CourseSearchComponent} from "../components/course-search/course-search.component";
import {CourseSearchService} from "../services/course-search/course-search.service";
import {LoginComponent} from '../components/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    MdSidenavModule,
    MdButtonModule,
    MdDialogModule,
  ],
  exports: [
    NavbarComponent,
    SpinnerComponent,
    SideNavComponent,
    MdSidenavModule,
    MdButtonModule,
    CourseSearchComponent,
  ],
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    SideNavComponent,
    CourseSearchComponent,
  ],
  entryComponents: [
    CourseSearchComponent,
  ],
  providers: [LoggerService, SpinnerService, MdDialog]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
