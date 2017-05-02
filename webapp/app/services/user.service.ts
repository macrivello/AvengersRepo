import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {current} from 'codelyzer/util/syntaxKind';
import {Flowchart} from '../models/flowchart.model';

@Injectable()
export class UserService {
  currentUser: User;
  currentFlowchart: Flowchart;

  constructor(private http: Http) {
  }

  getUser(): User {
    return this.currentUser;
  }

  getCurrentUser(): Observable<User> {

    // TODO Catch error if non-500, clear user from local storage
    return this.http.get('/users/me').map(response => {
      this.currentUser = response.json() as User;

      //TODO: Add user object to local storage.
      return this.currentUser;
    });
  }

  logout(): Observable<any> {
    console.log("logout");
    return this.http.get('/signout').map(response => {
      console.log(`${this.currentUser.email} has logged out.`);
      this.currentUser = null;
      return response.text();
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
