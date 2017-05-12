import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Flowchart } from '../../models/flowchart.model';
import { FlowchartService } from '../../services/flowchart/flowchart.service'

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css'],

})
export class LeftSideBarComponent implements OnInit {
  flowcharts: Flowchart[];
  constructor(private flowchartService: FlowchartService) {}
 @Output() flowchartSelected = new EventEmitter();
  ngOnInit() {
    this.flowchartService.getFlowcharts().subscribe((flowchartMap) =>
    this.flowcharts = Array.from(flowchartMap.values()));

  }


  onFlowchartSelected(id : number)
  {
    console.log(id);
    this.flowchartSelected.emit();
    this.flowchartService.setCurrentFlowchartByIDInMap(id);


  }


}
