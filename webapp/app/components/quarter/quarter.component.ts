import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quarter } from "../../models/quarter.model";
import { QuarterService} from "../../services/quarter/quarter.service"
import {QuarterView} from '../../models/quarter-view.model';
import {FlowchartEntry} from '../../models/flowchart-entry.model';

@Component({
  selector: 'app-quarter',
  templateUrl: './quarter.component.html',
  styleUrls: ['./quarter.component.css']
})
export class QuarterComponent implements OnInit {

  @Input() quarterView : QuarterView;
  @Output() addCourseClicked = new EventEmitter();

  quarter: Quarter;

  constructor(private quarterService : QuarterService) { }

  ngOnInit() {
    this.quarter = this.quarterView.quarter;
  }

  onAddCourseClicked() {
    this.addCourseClicked.emit(this.quarter);
  }
}

