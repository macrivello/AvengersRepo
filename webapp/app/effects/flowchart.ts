import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import {
  ADD_ENTRY, ADD_ENTRY_SUCCESS, AddEntryAction, AddEntryFailAction, AddEntrySuccessAction,
  DELETE_ENTRY, DELETE_ENTRY_SUCCESS, DeleteEntryAction, DeleteEntryFailAction, DeleteEntrySuccessAction, LOAD,
  LoadAction,
  LoadSuccessAction
} from '../actions/flowchart';
import {FlowchartService} from '../services/flowchart/flowchart.service';

@Injectable()
export class FlowchartEffects {



  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  // @Effect({ dispatch: false })
  // openDB$: Observable<any> = defer(() => {
  //   return this.db.open('books_app');
  // });

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadFlowcharts$: Observable<Action> = this.actions$
    .ofType(LOAD, DELETE_ENTRY_SUCCESS, ADD_ENTRY_SUCCESS)
    .switchMap(() => {
        console.log('Responding to LOAD Action');
        return this.flowchartService.getFlowcharts()
          .map(flowcharts => new LoadSuccessAction(flowcharts))
          .catch(() => of(new LoadSuccessAction([])));
    }
    );

  @Effect()
  deleteEntry$: Observable<Action> = this.actions$
    .ofType(DELETE_ENTRY)
    .map((action: DeleteEntryAction) => action.payload)
    .switchMap((id) => {
        console.log('Responding to DELETE_ENTRY Action');
        return this.flowchartService.deleteEntry(id)
          .map(() => new DeleteEntrySuccessAction(id))
          .catch(() => of(new DeleteEntryFailAction(id)));
      }
    );

  @Effect()
  addEntry$: Observable<Action> = this.actions$
    .ofType(ADD_ENTRY)
    .map((action: AddEntryAction) => action.payload)
    .switchMap((entry) => {
        console.log('Responding to ADD_ENTRY Action');
        return this.flowchartService.addEntry(entry)
          .map(() => new AddEntrySuccessAction(entry))
          .catch(() => of(new AddEntryFailAction(entry)));
      }
    );


  // @Effect()
  // addBookToCollection$: Observable<Action> = this.actions$
  //   .ofType(collection.ADD_BOOK)
  //   .map((action: collection.AddBookAction) => action.payload)
  //   .mergeMap(book =>
  //     this.db.insert('books', [ book ])
  //       .map(() => new collection.AddBookSuccessAction(book))
  //       .catch(() => of(new collection.AddBookFailAction(book)))
  //   );
  //
  //
  // @Effect()
  // removeBookFromCollection$: Observable<Action> = this.actions$
  //   .ofType(collection.REMOVE_BOOK)
  //   .map((action: collection.RemoveBookAction) => action.payload)
  //   .mergeMap(book =>
  //     this.db.executeWrite('books', 'delete', [ book.id ])
  //       .map(() => new collection.RemoveBookSuccessAction(book))
  //       .catch(() => of(new collection.RemoveBookFailAction(book)))
  //   );

  constructor(private actions$: Actions, private flowchartService: FlowchartService) { }
}
