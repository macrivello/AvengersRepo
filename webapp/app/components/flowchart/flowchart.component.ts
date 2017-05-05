import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";
import {UserService} from '../../services/user.service';
import {QuarterView} from '../../models/quarter-view.model';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Params} from '@angular/router';

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
  flowchart: Flowchart;
  quarters: Map<number, QuarterView>; //quarter id, quarterview

  constructor(private flowchartService: FlowchartService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.params['id'];

    this.route.params
      .switchMap((params: Params) => {
        return isNullOrUndefined(params['id'])
          ? this.flowchartService.getFirstFlowchart()
          : this.flowchartService.getFlowchart(+params['id'])
      })
      .subscribe(flowchart => {
        this.flowchart = flowchart;
        this.quarters = this.parseQuarters(flowchart);
        // console.log(`on init: ${JSON.stringify(flowchart)}`);
      });
  }

  // TODO The data structures could be made more efficient.
  // TODO this could be in a utility
  /*
     This function parses a flowchart object and returns a Map of QuarterViews
     keyed to the quarter id.
   */
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

    //TODO return the map sorted ?
    return quarters;
  }

  getQuarters(): QuarterView[] {
    return Array.from(this.quarters.values());
  }
}
