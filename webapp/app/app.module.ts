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
import {MdButtonModule, MdProgressSpinnerModule} from '@angular/material';
import {UserService} from './services/user.service';
import {LoginService} from './services/login.service';
import {AppRoutingModule} from './modules/app-routing.module';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {flowchartReducer} from './reducers/flowchart';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FlowchartEffects} from './effects/flowchart';
import {EffectsModule} from '@ngrx/effects';

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
    MdButtonModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.provideStore({flowchart: flowchartReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(FlowchartEffects),
  ],
  providers: [UserService, LoginService, FlowchartService, CourseService, QuarterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
