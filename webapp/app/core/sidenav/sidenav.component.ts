import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Flowchart } from '../../models/flowchart.model';
import { FlowchartService } from '../../services/flowchart.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SideNavComponent implements OnInit {
  @Output() flowchartSelected = new EventEmitter();
  @Output() sideNavClose = new EventEmitter();
  @Input() flowcharts: Flowchart[];

  constructor(private flowchartService: FlowchartService) {}

  ngOnInit() {}

  onFlowchartSelected(id : number)
  {
    console.log(`onFlowchartSelected: ${id}`);
    this.flowchartSelected.emit();
    this.flowchartService.setCurrentFlowchartByIDInMap(id);
  }

  onSidebarClose() {
    console.log('onSideBarClose');
    this.sideNavClose.emit();
  }
}
