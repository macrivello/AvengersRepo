import {FlowchartEntry} from './flowchart-entry.model';
import {Quarter} from './quarter.model';

export class QuarterView {
  quarter: Quarter;
  entries: FlowchartEntry[];

  constructor() {
    this.entries = [];
  }
}
