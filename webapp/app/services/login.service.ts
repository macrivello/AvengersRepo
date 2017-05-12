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



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
