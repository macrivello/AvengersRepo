import { Component, OnInit } from '@angular/core';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit {

  flowchart : Flowchart;

  constructor(private flowchartService : FlowchartService) {}

  ngOnInit() {

      this.flowchartService.getFlowchart(36)
      .then(
        flowchart => {
          console.log(flowchart);
          this.flowchart = flowchart});
  }

}
