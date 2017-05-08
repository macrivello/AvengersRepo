import {Component, Input, OnInit} from '@angular/core';
import {FlowchartEntry} from '../../models/flowchart-entry.model';
import {FlowchartService} from '../../services/flowchart/flowchart.service';
import {State} from '../../reducers/flowchart';
import {Store} from '@ngrx/store';
import {DeleteEntryAction} from '../../actions/flowchart';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() entry: FlowchartEntry;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onDeleteEntry() {
    this.store.dispatch(new DeleteEntryAction(this.entry.id));
  }
}
