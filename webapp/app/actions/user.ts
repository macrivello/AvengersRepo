import {Action} from '@ngrx/store';
import {User} from '../models/user.model';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';
export const VERIFY_USER = '[Auth] Verify User';
export const VERIFY_USER_SUCCESS = '[Auth] Verify User Success';
export const VERIFY_USER_FAIL = '[Auth] Verify User Fail';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: {username: string, password: string}){ }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: User){ }
}

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;

  // TODO This payload should contain login attempt error message
  constructor(){ }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor(){ }
}

export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESS;

  constructor(){ }
}

export class VerifyUserAction implements Action {
  readonly type = VERIFY_USER;

  constructor(){ }
}

export class VerifyUserSuccessAction implements Action {
  readonly type = VERIFY_USER_SUCCESS;

  constructor(public payload: User){ }
}

// TODO This payload should contain login attempt error message
export class VerifyUserFailAction implements Action {
  readonly type = VERIFY_USER_FAIL;

  constructor(){ }
}

export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | LogoutSuccessAction
  | VerifyUserAction
  | VerifyUserSuccessAction
  | VerifyUserFailAction;
