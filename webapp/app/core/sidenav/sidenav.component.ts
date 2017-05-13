import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Flowchart } from '../../models/flowchart.model';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import { Observable } from 'rxjs/Observable';
import {MdSidenav} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SideNavComponent implements OnInit {
  flowcharts$: Observable<Flowchart[]>;

  constructor(private flowchartService: FlowchartService) {
  }

 @Output() flowchartSelected = new EventEmitter();
 @Output() sideNavClose = new EventEmitter();

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

  onSidebarClose() {
    this.sideNavClose.emit();
  }
}
