import {AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { FlowchartService } from '../../services/flowchart/flowchart.service'
import {Flowchart} from "../../models/flowchart.model";
import {UserService} from '../../services/user.service';
import {QuarterView} from '../../models/quarter-view.model';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {State} from '../../reducers/flowchart';
import {isEmpty} from 'rxjs/operator/isEmpty';
import {AddEntryAction} from '../../actions/flowchart';
import {FlowchartEntryCompact} from '../../models/flowchart-entry.model';

@Component({
  selector: 'app-flowchart',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit {

  /*
    Initially I tried input binding but it was not working for some reason. Property was undefined
     even in ngOnInit();
   */
  state: Observable<State>;
  flowchart: Flowchart;
  quarters: Map<number, QuarterView>; //quarter id, quarterview

  constructor(private store: Store<State>) {
    this.state = store.select('flowchart');
  }

  ngOnInit() {
    this.state.subscribe(
      (state) => {
        this.flowchart = state.selectedFlowchart;
        this.quarters = this.parseQuarters(this.flowchart);
      },

      (err) => console.log(err)
    );

    // const id = this.route.params['id'];

    // this.route.params
  //     .switchMap((params: Params) => {
  //       return isNullOrUndefined(params['id'])
  //         ? this.flowchartService.getFirstFlowchart()
  //         : this.flowchartService.getFlowchart(+params['id'])
  //     })
  //     .subscribe(flowchart => {
  //       this.flowchart = flowchart;
  //       this.quarters = this.parseQuarters(flowchart);
  //       // console.log(`on init: ${JSON.stringify(flowchart)}`);
  //     });
  }

  // TODO The data structures could be made more efficient.
  // TODO this could be in a utility
  /*
     This function parses a flowchart object and returns a Map of QuarterViews
     keyed to the quarter id.
   */
  private parseQuarters(flowchart: Flowchart): Map<number, QuarterView> {
    if (isNullOrUndefined(flowchart)) {
      return;
    }

    let quarters = new Map();
    for (let entry of flowchart.entries){
      const quarterId = entry.quarter.id;

      // Populate list of QuarterViews
      let quarterView = quarters.get(quarterId); // check if QuarterView for quarter exists
      if (isNullOrUndefined(quarterView)) {
        quarterView = new QuarterView();
        quarterView.quarter = entry.quarter;
        quarters.set(quarterId, quarterView)
      }

      quarterView.entries.push(entry); // add entry to quarter
    }

    //TODO return the map sorted ?
    return quarters;
  }

  getQuarters(): QuarterView[] {
    return Array.from(this.quarters.values());
  }

  onAddEntry() {
    const entry: FlowchartEntryCompact = {
      flowchart_id: this.flowchart.id,
      course_id: 73,
      quarter_id: 13
    };
    this.store.dispatch(new AddEntryAction(entry));
  }
}
