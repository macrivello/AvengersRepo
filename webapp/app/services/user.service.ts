import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {current} from 'codelyzer/util/syntaxKind';

@Injectable()
export class UserService {
  currentUser: User;

  constructor(private http: Http) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.get('/users/me').map(response => {
      this.currentUser = response.json() as User;
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
