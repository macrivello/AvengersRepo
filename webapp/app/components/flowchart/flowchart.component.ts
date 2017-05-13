import {AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";
import {UserService} from '../../services/user.service';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {subscribeOn} from "rxjs/operator/subscribeOn";
import {Subscription} from 'rxjs/Subscription';
import {QuarterView} from '../../models/quarter-view.model';
import {FlowchartViewModel} from '../../models/flowchart-view.model';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Quarter} from '../../models/quarter.model';
import {CourseSearchComponent} from '../course-search/course-search.component';
import {Course} from '../../models/course.model';
import {FlowchartEntryCompact} from '../../models/flowchart-entry.model';

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
  flowchartView$: Observable<FlowchartViewModel>;
  flowchart: Flowchart;
  // quarters: QuarterView[];
  // quarters: Map<number, QuarterView>; //quarter id, quarterview

  initialSubscription: Subscription;
  constructor(private flowchartService: FlowchartService,
              private route: ActivatedRoute,
              public dialog: MdDialog) {}

  ngOnInit() {
    console.log("onInit: FlowchartComponent ");
    const id = this.route.params['id'];
    this.initialSubscription = this.flowchartService.getFlowcharts().subscribe();
    this.flowchartView$ = this.flowchartService.getCurrentFlowchart()
      .map((flowchart) => {
            console.log('new event coming through');
            this.flowchart = flowchart;
            return {flowchart: flowchart, quarters: this.parseQuarters(flowchart)};
      });
  }

  ngOnDestroy()
  {
    this.initialSubscription.unsubscribe();
  }

  // TODO The data structures could be made more efficient.
  // TODO this could be in a utility
  /*
     This function parses a flowchart object and returns a Map of QuarterViews
     keyed to the quarter id.
   */
  private parseQuarters(flowchart: Flowchart): QuarterView[] {
    if (isNullOrUndefined(flowchart)
     || isNullOrUndefined(flowchart.entries)
     || flowchart.entries.length === 0) {

      return [];
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

  openAddCourseDialog(quarter: Quarter) {
    let dialogRef = this.dialog.open(CourseSearchComponent, {data: quarter});

    dialogRef.afterClosed()
      .subscribe(course => {
        if (isNullOrUndefined(course)){
          console.log("CourseSearch closed. No course selected.");
          return
        }

        let entry: FlowchartEntryCompact = {
          flowchart_id: this.flowchart.id,
          quarter_id: quarter.id,
          course_id: course.id,
        };
        this.flowchartService.addEntry(entry)
        return;
    });
  }
}
