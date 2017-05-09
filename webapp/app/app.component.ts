import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from './models/user.model';
import {UserService} from './services/user.service';
import {current} from 'codelyzer/util/syntaxKind';
import {Flowchart} from './models/flowchart.model';
import {FlowchartEntry} from './models/flowchart-entry.model';
import {FlowchartService} from './services/flowchart/flowchart.service';
import {Router} from '@angular/router';
import {FlowchartState} from './reducers/flowchart';
import {Store} from '@ngrx/store';
import {LoadAction} from './actions/flowchart';
import {UserState} from './reducers/user';
import {Observable} from 'rxjs/Observable';
import {VerifyUserAction} from './actions/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  // flowcharts$: Observable<Flowchart[]>;
  // selectedFlowchart$: Observable<Flowchart>;

  constructor(private userService: UserService,
              private router: Router,
              // TODO: Combine to a single State Store
              private flowchartStore: Store<FlowchartState>,
              private userStore: Store<UserState>) {
    this.user$ = this.userStore.select(state => state.user);
    // this.flowcharts$ = this.flowchartStore.select(state => state.flowcharts);
    // this.selectedFlowchart$ = this.flowchartStore.select(state => state.selectedFlowchart);

  }

  ngOnInit(): void {
    this.userStore.dispatch(new VerifyUserAction());
    // this.userService.verifyUser()
    //   .subscribe(() => {
    //       this.store.dispatch(new LoadAction());
    //     },
    //     (err) => this.router.navigate(['/login']));
  }
}
