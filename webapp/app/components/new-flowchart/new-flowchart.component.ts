import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Flowchart, FlowchartCompact} from '../../models/flowchart.model';
import {FlowchartService} from '../../services/flowchart.service';
import {FlowchartSearchService} from '../../services/flowchart-search.service';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-flowchart',
  templateUrl: './new-flowchart.component.html',
  styleUrls: ['./new-flowchart.component.css']
})
export class NewFlowchartComponent implements OnInit {
  flowchartCtrl: FormControl;
  filteredFlowcharts: any;
  flowcharts: FlowchartCompact[];
  loading: boolean;

  selectedFlowchart: FlowchartCompact;

  constructor(public dialogRef: MdDialogRef<NewFlowchartComponent>,
              private flowchartService: FlowchartService,
              private flowchartSearchService: FlowchartSearchService) {
    this.flowchartCtrl = new FormControl();
    this.filteredFlowcharts = this.flowchartCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterFlowcharts(name));

    // TODO this is hacky. Having trouble getting id from selected flowchart in autocomplete
    this.flowchartCtrl.valueChanges.subscribe(value => {
      if (typeof value === 'object') {
        this.selectedFlowchart = value;
      }
    })
  }

  ngOnInit() {
    this.loading = true;
    this.flowchartService.getAllOfficialFlowcharts().then(flowcharts => {
      this.loading = false;
      this.flowcharts = flowcharts;
    }).catch((e) => {
      this.loading = false;
    });
  }

  filterFlowcharts(val: string) {
    return val ? this.flowcharts.filter(f => new RegExp(`^${val}`, 'gi').test(f.name))
      : this.flowcharts;
  }

  flowchartName(flowchart: FlowchartCompact): string {
    return flowchart ? flowchart.name : "";
  }
}
