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
import { FlowchartService } from './services/flowchart/flowchart.service';
import { CourseService } from "./services/course/course.service";
import { CourseSearchService } from "./services/course-search/course-search.service";
import { QuarterService } from "./services/quarter/quarter.service";
import { LoginComponent } from './components/login/login.component';
import {UserService} from './services/user.service';
import {LoginService} from './services/login.service';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'flowchart', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'flowchart',  component: FlowchartComponent, canActivate: [AuthGuard] },
  { path: 'flowchart/:id',  component: FlowchartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } // TODO Or we can display an ErrorComponent since this is technically a 404
];

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    FlowchartComponent,
    LoginComponent,
    QuarterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    RouterModule.forRoot(routes , {useHash: true} )
  ],
  entryComponents: [
    CourseSearchComponent
  ],
  providers: [UserService, LoginService, FlowchartService, CourseService, CourseSearchService, QuarterService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
