import { Component, OnInit } from '@angular/core';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit {

  flowchart : Flowchart;

  constructor(private flowchartService : FlowchartService, private userService: UserService) {}

  ngOnInit() {
    this.flowchartService.getFirstFlowchart()
      .subscribe((data) => this.flowchart = data);
  }
}
