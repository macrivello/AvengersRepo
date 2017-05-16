import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {Flowchart} from './models/flowchart.model';
import {FlowchartService} from './services/flowchart.service';
import {Observable} from 'rxjs/Observable';
import {MdSidenav} from '@angular/material';
import {isNullOrUndefined} from 'util';
import {NavbarService} from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sideNavComponent: MdSidenav;
  allFlowcharts$: Observable<Flowchart[]>;

  constructor(private userService: UserService,
              private flowchartService: FlowchartService,
              private navbarService: NavbarService,
              private router: Router) {
    this.allFlowcharts$ = this.flowchartService.getAllFlowcharts();
  }

  ngOnInit(): void {
    // listen on user event
    this.userService.getCurrentUser()
      .subscribe((user) => {
        if (!isNullOrUndefined(user)) { // valid user
          this.flowchartService.updateAllFlowcharts();
        }
      });
  }

  onSideNavToggle(){
    console.log('onSideNavToggle');
    this.sideNavComponent.toggle();
    // this.navbarService.onSideNavToggle();
  }
}
