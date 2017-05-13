import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FlowchartService} from './flowchart/flowchart.service';

@Injectable()
export class UserService {
  currentUserSource = new BehaviorSubject(UserService.getCurrentUser());
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: Http,
              private flowchartService: FlowchartService) {}

  static getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }

  verifyUser(): Observable<User> {
    // TODO Catch error if non-500, clear user from local storage
    console.log('Verify User');
    return this.http.get('api/users/me').map(response => {
      const user = response.json() as User;

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSource.next(user);

      return user;
    }).catch((err) => {
      console.log(`Error verifying user: ${err}`);
      return Observable.throw(new Error(err.status));
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/login', {username: username, password: password})
      .flatMap(() => this.verifyUser());
  }

  logout(): Observable<any> {
    console.log("logout");
    return this.http.get('/signout').map(response => {
      console.log(`${UserService.getCurrentUser().email} has logged out.`);
      this.currentUserSource.next(null);
      this.flowchartService.clearData();
      localStorage.removeItem('currentUser');
    // TODO Emit an event, or somehow clear the flowchart object in the app component.
      return response.text();
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
