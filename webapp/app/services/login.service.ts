import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import {UserService} from './user.service';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
  constructor(private http: Http, private userService: UserService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/login', {username: username, password: password})
      .flatMap(() => this.userService.getCurrentUser())
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
