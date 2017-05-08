import { Action } from '@ngrx/store';
import {Flowchart} from '../models/flowchart.model';
import {FlowchartEntry, FlowchartEntryCompact} from '../models/flowchart-entry.model';

export const LOAD =             '[Flowchart] Load';
export const LOAD_SUCCESS =     '[Flowchart] Load Success';
export const LOAD_FAIL =     '[Flowchart] Load Fail';
export const RESET =            '[Flowchart] Clear';
export const DELETE_ENTRY =     '[Flowchart] Delete Entry';
export const DELETE_ENTRY_SUCCESS =     '[Flowchart] Delete Entry Success';
export const DELETE_ENTRY_FAIL =     '[Flowchart] Delete Entry Fail';
export const ADD_ENTRY =     '[Flowchart] Add Entry';
export const ADD_ENTRY_SUCCESS =     '[Flowchart] Add Entry Success';
export const ADD_ENTRY_FAIL =     '[Flowchart] Add Entry Fail';
export const UPDATE_ENTRY =     '[Flowchart] Update Entry';
export const UPDATE_ENTRY_SUCCESS =     '[Flowchart] Update Entry SUCCESS';
export const UPDATE_ENTRY_FAIL =     '[Flowchart] Update Entry Fail';


export class LoadAction implements Action {
  readonly type = LOAD;

  constructor() { }
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Flowchart[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: Flowchart[]) { }
}

export class ResetAction implements Action {
  readonly type = RESET;

  constructor() { }
}

export class DeleteEntryAction implements Action {
  readonly type = DELETE_ENTRY;

  constructor(public payload: number) { }
}

export class DeleteEntrySuccessAction implements Action {
  readonly type = DELETE_ENTRY_SUCCESS;

  constructor(public payload: number) { }
}

export class DeleteEntryFailAction implements Action {
  readonly type = DELETE_ENTRY_FAIL;

  constructor(public payload: number) { }
}

export class AddEntryAction implements Action {
  readonly type = ADD_ENTRY;

  constructor(public payload: FlowchartEntryCompact) { }
}

export class AddEntrySuccessAction implements Action {
  readonly type = ADD_ENTRY_SUCCESS;

  constructor(public payload: FlowchartEntryCompact) { }
}

export class AddEntryFailAction implements Action {
  readonly type = ADD_ENTRY_FAIL;

  constructor(public payload: FlowchartEntryCompact) { }
}

export class UpdateEntryAction implements Action {
  readonly type = UPDATE_ENTRY;

  constructor(public payload: FlowchartEntry) { }
}

export class UpdateEntrySuccessAction implements Action {
  readonly type = UPDATE_ENTRY_SUCCESS;

  constructor() { }
}

export class UpdateEntryFailAction implements Action {
  readonly type = UPDATE_ENTRY_FAIL;

  constructor() { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | ResetAction
  | AddEntryAction
  | AddEntrySuccessAction
  | AddEntryFailAction
  | DeleteEntryAction
  | DeleteEntrySuccessAction
  | DeleteEntryFailAction
  | UpdateEntryAction
  | UpdateEntrySuccessAction
  | UpdateEntryFailAction;
