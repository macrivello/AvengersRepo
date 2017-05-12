import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './models/user.model';
import {UserService} from './services/user.service';
import {current} from 'codelyzer/util/syntaxKind';
import {Flowchart} from './models/flowchart.model';
import {FlowchartEntry} from './models/flowchart-entry.model';
import {FlowchartService} from './services/flowchart/flowchart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  // TODO Where should this live? Do we want it in another class?
  flowchart: Flowchart;

  constructor(private userService: UserService,
              private flowchartService: FlowchartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.verifyUser()
      .subscribe(() => {},
        (err) => this.router.navigate(['/login']));
  }
}
