import {FlowchartEntry} from './flowchart-entry.model';
import {User} from './user.model';
export class Flowchart {
  id: number;
  name: string;
  user: User;
  entries: FlowchartEntry[];
}
