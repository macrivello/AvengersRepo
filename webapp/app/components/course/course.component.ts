import {Component, Input, OnInit} from '@angular/core';
import {FlowchartEntry} from '../../models/flowchart-entry.model';
import {FlowchartService} from '../../services/flowchart/flowchart.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() entry: FlowchartEntry;

  constructor(private flowchartService : FlowchartService) { }

  ngOnInit() {
  }

  onRemove() {
  }
}
