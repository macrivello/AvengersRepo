import {FlowchartEntry} from './flowchart-entry.model';
export class Flowchart {
  id: number;
  name: string;
  user_id: number;
  entries: FlowchartEntry[];
}
