import {Course} from './course.model';
import {Quarter} from './quarter.model';
import {Flowchart} from './flowchart.model';
export class FlowchartEntry {
  id: number;
  course: Course;
  quarter: Quarter;
}

export class FlowchartEntryCompact {
  flowchart_id: number;
  course_id: number;
  quarter_id: number;
}
