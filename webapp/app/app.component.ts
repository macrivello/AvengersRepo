import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
  flowchart: Flowchart;

  constructor(private userService: UserService, private flowchartService: FlowchartService) {
  }

  ngOnInit(): void {
    let user: User; // TODO retrieve user object to local storage.
    this.userService.getCurrentUser().subscribe((data) => user = data); // Async
    this.flowchartService.flowchartChanged.subscribe((data) => {
        this.updateFlowchart();
    });
    this.flowchartService.updateFlowchart();
  }

  updateFlowchart() {
    this.flowchartService.getFirstFlowchart()
      .subscribe((data) => {
          this.flowchart = data;
        },
        (error) => console.log(`Error getting first flowchart for user ${this.userService.currentUser.email}`));
  }
}
