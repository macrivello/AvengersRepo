import { ActionReducer, Action } from '@ngrx/store';
import {Flowchart} from '../models/flowchart.model';
import {FlowchartEntry} from '../models/flowchart-entry.model';
import {QuarterView} from '../models/quarter-view.model';
import * as flowchart from '../actions/flowchart';

export interface FlowchartState {
  flowcharts: Flowchart[];
  selectedFlowchart: Flowchart;
  loading: boolean;
};

export const initialState: FlowchartState = {
  flowcharts: [],
  selectedFlowchart: null,
  loading: false,
};

export function flowchartReducer(state = initialState, action: flowchart.Actions): FlowchartState {
  switch (action.type) {
    case flowchart.LOAD:
      console.log('Responding to LOAD Action');
      return Object.assign({}, state, {
        loading: true
      });

    case flowchart.LOAD_SUCCESS:
      console.log('Responding to LOAD_SUCCESS Action');

      const flowcharts = action.payload as Flowchart[];
      const selectedFlowchart = (flowcharts && flowcharts.length > 0) ? flowcharts[0] : null;

      return {
        flowcharts: flowcharts,
        selectedFlowchart: selectedFlowchart,
        loading: false
      };

    case flowchart.LOAD_FAIL:
      console.log('Responding to LOAD_FAIL Action');
      return Object.assign({}, state, {
        loading: false
      });

    case flowchart.DELETE_ENTRY_SUCCESS:
      console.log('Responding to DELETE_ENTRY_SUCCESS Action');
      return Object.assign({}, state, {
        loading: false
      });

    case flowchart.RESET:
      console.log('Responding to RESET Action');

      return initialState;

    default:
      return state;
  }
}
