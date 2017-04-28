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


@NgModule({
  declarations: [
    AppComponent,
    FlowchartComponent,
    CourseComponent,
    QuarterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [FlowchartService, CourseService, QuarterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
