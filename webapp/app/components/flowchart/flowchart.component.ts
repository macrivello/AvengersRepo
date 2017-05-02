import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";
import {UserService} from '../../services/user.service';
import {QuarterView} from '../../models/quarter-view.model';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit {

  /*
    Initially I tried input binding but it was not working for some reason. Property was undefined
     even in ngOnInit();
   */
  @Input() flowchart: Flowchart;
  quarters: Map<number, QuarterView>; //quarter id, quarterview
  flowchartService: FlowchartService;
  userService: UserService;

  constructor(flowchartService: FlowchartService, userService: UserService) {
    this.flowchartService = flowchartService;
    this.userService = userService;
  }

  ngOnInit() {
    console.log(`flowchart onInit: ${this.flowchart}`);
    this.quarters = this.parseQuarters(this.flowchart);
  }

  // TODO The data structures could be made more efficient.
  // TODO this could be in a utility
  private parseQuarters(flowchart: Flowchart): Map<number, QuarterView> {
    if (isNullOrUndefined(flowchart)) {
      return;
    }

    let quarters = new Map();
    for (let entry of flowchart.entries){
      const quarterId = entry.quarter.id;

      // Populate list of QuarterViews
      let quarterView = quarters.get(quarterId); // check if QuarterView for quarter exists
      if (isNullOrUndefined(quarterView)) {
        quarterView = new QuarterView();
        quarterView.quarter = entry.quarter;
        quarters.set(quarterId, quarterView)
      }

      quarterView.entries.push(entry); // add entry to quarter
    }

    return quarters;
  }

  getQuarters(): QuarterView[] {
    return Array.from(this.quarters.values());
  }
}
