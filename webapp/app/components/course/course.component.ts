import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FlowchartEntry} from '../../models/flowchart-entry.model';
import {FlowchartService} from '../../services/flowchart.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  @Input() entry: FlowchartEntry;

  constructor(private flowchartService : FlowchartService) { }

  ngOnInit() {
  }

  onCourseRemove(entry: FlowchartEntry) {
    console.log(`OnCourseRemove: ${entry.id}`);
    this.flowchartService.deleteEntry(entry);
  }

}
