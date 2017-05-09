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
import { of } from 'rxjs/observable/of';
import {FlowchartService} from '../services/flowchart/flowchart.service';
import * as user from '../actions/user';
import {UserService} from '../services/user.service';

@Injectable()
export class UserEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  verifyUser$: Observable<Action> = this.actions$
    .ofType(user.VERIFY_USER)
    // .startWith(new user.VerifyUserAction())
    .switchMap(() => {
        console.log('Responding to VERIFY_USER Action');
        return this.userService.verifyUser()
          .map(currentUser => new user.VerifyUserSuccessAction(currentUser))
          .catch(() => of(new user.VerifyUserFailAction()));
      }
    );

  @Effect()
  loginUser$: Observable<Action> = this.actions$
    .ofType(user.LOGIN)
    .map((action: user.LoginAction) => action.payload)
    .mergeMap((payload) => {
        console.log('Responding to LOGIN Action');
        return this.userService.login(payload.username, payload.password)
          .map(currentUser => new user.VerifyUserSuccessAction(currentUser))
          .catch(() => of(new user.VerifyUserFailAction()));
      }
    );

  @Effect()
  logoutUser$: Observable<Action> = this.actions$
    .ofType(user.LOGOUT)
    .switchMap(() => {
        console.log('Responding to LOGIN Action');
        return this.userService.logout()
          .map(() => new user.LogoutSuccessAction())
          .catch(() => of()); //TODO do something with error
      }
    );

  constructor(private actions$: Actions, private userService: UserService) { }
}
