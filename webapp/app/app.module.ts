import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { CourseComponent } from './components/course/course.component';
import { QuarterComponent } from './components/quarter/quarter.component';
import { AppComponent } from './app.component';
import { FlowchartService} from './services/flowchart/flowchart.service';
import {CourseService} from "./services/course/course.service";
import {QuarterService} from "./services/quarter/quarter.service";

import { LoginComponent } from './components/login/login.component';
import { MdProgressSpinnerModule } from '@angular/material';
import {UserService} from './services/user.service';
import {LoginService} from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    FlowchartComponent,
    CourseComponent,
    QuarterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdProgressSpinnerModule,
    FormsModule,
    CoreModule
  ],
  providers: [UserService, LoginService, FlowchartService, CourseService, QuarterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
