import {Component, Input, OnInit} from '@angular/core';
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

  @Input() quarter : QuarterView;

  constructor(private quarterService : QuarterService) { }

  ngOnInit() {
  }
}

