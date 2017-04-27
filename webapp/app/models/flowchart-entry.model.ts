import {Course} from './course.model';
import {Quarter} from './quarter.model';
import {Flowchart} from './flowchart.model';
export class FlowchartEntry {
  id: number;
  course: Course;
  flowchart: Flowchart;
  quarter: Quarter;
}
