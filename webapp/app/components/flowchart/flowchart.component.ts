import {AfterContentInit, AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";
import {UserService} from '../../services/user.service';
import {QuarterView} from '../../models/quarter-view.model';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {subscribeOn} from "rxjs/operator/subscribeOn";

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit, OnDestroy {

  /*
    Initially I tried input binding but it was not working for some reason. Property was undefined
     even in ngOnInit();
   */
  flowchart$: Observable<Flowchart>;
  quarterViews$: Observable<QuarterView[]>;
  quarters: Map<number, QuarterView>; //quarter id, quarterview

  subscription;
  constructor(private flowchartService: FlowchartService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.params['id'];

    this.subscription = this.flowchartService.getFlowcharts().subscribe();
    this.flowchart$ = this.flowchartService.getCurrentFlowchart();

    this.quarterViews$ =  this.flowchart$.delay(10).map(flowchart => {
      console.log(JSON.stringify(flowchart));
      return this.parseQuarters(flowchart)
    });


    /*
    this.flowchart$.map(flowchart => {
      console.log("im here")
      return this.parseQuarters(flowchart)
    }).subscribe();
    */
    // this.route.params
    //   .switchMap((params: Params) => {
    //     return isNullOrUndefined(params['id'])
    //       ? this.flowchartService.getFlowcharts()
    //       : this.flowchartService.getFlowchart(+params['id'])
    //   })

        // console.log(`on init: ${JSON.stringify(flowchart)}`);

  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  // TODO The data structures could be made more efficient.
  // TODO this could be in a utility
  /*
     This function parses a flowchart object and returns a Map of QuarterViews
     keyed to the quarter id.
   */
  private parseQuarters(flowchart: Flowchart): QuarterView[] {
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
    return Array.from(quarters.values());
  }

  getQuarters(): QuarterView[] {
    return Array.from(this.quarters.values());
  }
}
