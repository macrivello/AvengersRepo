import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from './models/user.model';
import {UserService} from './services/user.service';
import {current} from 'codelyzer/util/syntaxKind';
import {Flowchart} from './models/flowchart.model';
import {FlowchartEntry} from './models/flowchart-entry.model';
import {FlowchartService} from './services/flowchart/flowchart.service';
import {Router} from '@angular/router';
import {State} from './reducers/flowchart';
import {Store} from '@ngrx/store';
import {LoadAction} from './actions/flowchart';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private store: Store<State>) {
  }

  ngOnInit(): void {
    this.userService.verifyUser()
      .subscribe(() => {
          this.store.dispatch(new LoadAction());
        },
        (err) => this.router.navigate(['/login']));
  }
}
