import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {Flowchart} from './models/flowchart.model';
import {FlowchartService} from './services/flowchart/flowchart.service';
import {Observable} from 'rxjs/Observable';
import {MdSidenav} from '@angular/material';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  currentFlowchart$: Observable<Flowchart>;
  allFlowcharts$: Observable<Flowchart[]>;

  @ViewChild('sidenav') sideNavComponent: MdSidenav;

  constructor(private userService: UserService,
              private flowchartService: FlowchartService,
              private router: Router) {}

  ngOnInit(): void {
    // listen on user event
    this.userService.getCurrentUser()
      .subscribe((user) => {
        if (!isNullOrUndefined(user)) { // valid user
          this.flowchartService.updateAllFlowcharts();
        }
      });

    this.currentFlowchart$ = this.flowchartService.getCurrentFlowchart();

    // Observable to pass to sidenav.
    this.allFlowcharts$ = this.flowchartService.getAllFlowcharts();
  }

  onSideNavToggle(){
    this.sideNavComponent.toggle();
  }
}
