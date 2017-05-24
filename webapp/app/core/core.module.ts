import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdDialog, MdDialogModule, MdSidenavModule} from '@angular/material';


import { LoggerService } from './logger.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { NavbarComponent } from './navbar/navbar.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SideNavComponent } from './sidenav/sidenav.component';
import {CourseSearchComponent} from "../components/course-search/course-search.component";
import {MdButtonToggleModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    MdSidenavModule,
    MdButtonModule,
    MdDialogModule,
    MdButtonToggleModule,
    NgbModule
  ],
  exports: [
    SideNavComponent,
    NavbarComponent,
    SpinnerComponent,
    MdSidenavModule,
    MdButtonModule,
    MdButtonToggleModule,
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
