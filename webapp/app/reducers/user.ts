///<reference path="../actions/user.ts"/>
import {User} from '../models/user.model';
import * as user from '../actions/user';

export interface UserState {
  user: User
}

export const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('currentUser')) as User
};

export function userReducer(state = initialState, action: user.Actions) {
  switch (action.type) {
    case user.LOGIN_SUCCESS:
      return {user: action.payload};

    case user.VERIFY_USER_SUCCESS:
      return {user: action.payload};

    case user.LOGIN_FAIL:
      return state;

    case user.LOGOUT_SUCCESS:
    case user.VERIFY_USER_FAIL:
      return initialState;

    default:
      return state;
  }
}
