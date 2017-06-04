import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {Flowchart} from './models/flowchart.model';
import {FlowchartService} from './services/flowchart.service';
import {Observable} from 'rxjs/Observable';
import {MdSidenav} from '@angular/material';
import {isNullOrUndefined} from 'util';
import {NavbarService} from './services/navbar.service';
import {User} from './models/user.model';
import {QuarterService} from './services/quarter.service';
import {Quarter} from './models/quarter.model';
import {CourseService} from './services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sideNavComponent: MdSidenav;
  allFlowcharts$: Observable<Flowchart[]>;
  selectedFlowchartId$: Observable<number>;
  currentUser$: Observable<User>;

  constructor(private flowchartService: FlowchartService,
              private userService: UserService,
              private quarterService: QuarterService,
              private courseService: CourseService,
              private router: Router) {
    this.allFlowcharts$ = this.flowchartService.getAllFlowcharts();
    this.selectedFlowchartId$ = this.flowchartService.getCurrentFlowchartId();
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    // listen on user event
    this.userService.getCurrentUser()
      .subscribe((user) => {
        if (!isNullOrUndefined(user)) { // valid user
          this.flowchartService.fetchAndUpdateAllFlowcharts();
        }
      });

    this.quarterService.initQuarterData();
    this.courseService.initCourseData();
  }

  onSideNavToggle(){
    console.log('onSideNavToggle');
    this.sideNavComponent.toggle();
  }

  onUserSignOut(){
    console.log('onUserSignOut');
    this.userService.logout()
      .then(() => {
        console.log("routing to /login");
        this.router.navigate(['login']);
      });
  }

  onNewFlowchart() {
    console.log("onNewFlowchart");
    this.flowchartService.createFlowchart()
      .subscribe((flowchart) => {
          this.flowchartService.setCurrentFlowchartByIDInMap(flowchart.id);
          this.sideNavComponent.close();
      });
  }
}
