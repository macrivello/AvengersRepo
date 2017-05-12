import {Component, EventEmitter, OnInit, Output} from '@angular/core';

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
 @Output() flowchartSelected = new EventEmitter();

  ngOnInit() {
    this.flowcharts$ = this.flowchartService.getFlowcharts()
    .map((flowchartMaps) => {
        //TODO Do we really need to be returning a map here?
        return Array.from(flowchartMaps.values());
    })
  }


  onFlowchartSelected(id : number)
  {
    console.log(id);
    this.flowchartSelected.emit();
    this.flowchartService.setCurrentFlowchartByIDInMap(id);
  }
}
