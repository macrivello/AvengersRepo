import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { CourseComponent } from './components/course/course.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { QuarterComponent } from './components/quarter/quarter.component';
import { AppComponent } from './app.component';
import { FlowchartService} from './services/flowchart/flowchart.service';
import {CourseService} from "./services/course/course.service";
import {CourseSearchService} from "./services/course-search/course-search.service";
import {QuarterService} from "./services/quarter/quarter.service";

import { LoginComponent } from './components/login/login.component';
import {MdButtonModule, MdProgressSpinnerModule} from '@angular/material';
import {UserService} from './services/user.service';
import {LoginService} from './services/login.service';
import {AppRoutingModule} from './modules/app-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CourseSearchComponent,
    FlowchartComponent,
    LoginComponent,
    QuarterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdProgressSpinnerModule,
    MdButtonModule,
    FormsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [UserService, LoginService, FlowchartService, CourseService, CourseSearchService, QuarterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
