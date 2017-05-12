import { Component, OnInit } from '@angular/core';

import { Flowchart } from '../../models/flowchart.model';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css'],

})
export class LeftSideBarComponent implements OnInit {
  flowcharts$: Observable<Flowchart[]>;
  constructor(private flowchartService: FlowchartService) {}

  ngOnInit() {
    this.flowcharts$ = this.flowchartService.getFlowcharts();
  }

  onFlowchartSelected(id: number){
    console.log(`flowchart ${id}`);
  }
}
