import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit,
  Output, ViewChild
} from '@angular/core';
import { FlowchartService } from '../../services/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";
import {isNullOrUndefined} from 'util';
import {MdDialog} from '@angular/material';
import {Quarter} from '../../models/quarter.model';
import {CourseSearchComponent} from '../course-search/course-search.component';
import {FlowchartEntryCompact} from '../../models/flowchart-entry.model';
import {FlowchartView} from '../../models/flowchart-view.model';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowchartComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('flowchartTitleInput') flowchartTitleInput;
  @Input() flowchartView: FlowchartView;
  @Output() onDeleteFlowchart = new EventEmitter();
  editTitleMode: boolean = false;

  constructor(private flowchartService: FlowchartService,
              public dialog: MdDialog) {}

  ngOnInit() {
  }

  ngOnDestroy(){}

  ngOnChanges() {
    this.editTitleMode = false;
  }

  isCurrentUserAdmin() {
    return UserService.isCurrentUserAdmin();
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
          flowchart_id: this.flowchartView.flowchart.id,
          quarter_id: quarter.id,
          course_id: course.id,
        };
        this.flowchartService.addEntry(entry);
        return;
    });
  }

  onFlowchartEdit(editMode: boolean) {
    console.log("onFlowchartEdit");
    this.editTitleMode = editMode;
    if (editMode){
      // TODO figureout how to do this without a timeout
      setTimeout(() => {
        this.flowchartTitleInput.nativeElement.focus()
      }, 0);
    }
  }

  onFlowchartNameEdit(event: any){
    console.log("onFlowchartNameEdit");
    switch (event.keyCode){
      case 27: // esc
        this.flowchartTitleInput.nativeElement.blur();
        break;
      case 13: // return
        console.log("update Flowchart Title");
        this.flowchartTitleInput.nativeElement.blur();
        let flowchart = this.flowchartView.flowchart;

        if (event.target.value.length >= 1){
          flowchart.name = event.target.value;
          this.flowchartService.updateFlowchart(flowchart.id, flowchart);
        } else {
          event.target.value = flowchart.name;
        }
        break;
    }
  }

  onFlowchartDelete(flowchartId: number) {
    console.log("onFlowchartDelete");
    this.onDeleteFlowchart.emit(flowchartId);
    this.flowchartService.deleteFlowchart(flowchartId);
  }

  onAddQuarter() {
    console.log("onAddQuarter");
  }

  onAddYear() {
    console.log("onAddYear");
  }
}
