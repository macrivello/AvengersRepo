import {Flowchart} from './flowchart.model';
export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  flowcharts: Flowchart[];
  // TODO: add roles
}
