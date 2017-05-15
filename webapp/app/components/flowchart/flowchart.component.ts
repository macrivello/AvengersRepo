import {Component, OnDestroy, OnInit} from '@angular/core';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";
import {isNullOrUndefined} from 'util';
import {MdDialog} from '@angular/material';
import {Quarter} from '../../models/quarter.model';
import {CourseSearchComponent} from '../course-search/course-search.component';
import {FlowchartEntryCompact} from '../../models/flowchart-entry.model';
import {FlowchartView} from '../../models/flowchart-view.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit, OnDestroy {
  flowchartView$: Observable<FlowchartView>;
  flowchart: Flowchart;

  constructor(private flowchartService: FlowchartService,
              public dialog: MdDialog) {}

  ngOnInit() {
    console.log("onInit: FlowchartComponent ");
    this.flowchartView$ = this.flowchartService.getCurrentFlowchart().map((flowchart) => {
      this.flowchart = flowchart;
      return FlowchartService.buildFlowchartView(flowchart);
    });
  }

  ngOnDestroy(){}

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
        this.flowchartService.addEntry(entry);
        return;
    });
  }

}
