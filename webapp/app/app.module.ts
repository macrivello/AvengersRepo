import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MainComponent} from './core/layout/main/main.component';
import {CoreModule} from './core/core.module';
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { CourseComponent } from './components/course/course.component';
import { QuarterComponent } from './components/quarter/quarter.component';

@NgModule({
  declarations: [
    MainComponent,
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
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
