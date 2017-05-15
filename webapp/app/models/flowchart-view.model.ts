import {Flowchart} from './flowchart.model';
import {QuarterView} from './quarter-view.model';

export class FlowchartView {
  flowchart: Flowchart;
  quarters: QuarterView[];

  constructor() {
    this.quarters = [];
  }
}


