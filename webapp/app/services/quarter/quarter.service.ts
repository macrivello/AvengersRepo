import { Injectable } from '@angular/core';
import { Quarter} from "../../models/quarter.model";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {toPromise} from "rxjs/operator/toPromise";

@Injectable()
export class QuarterService {

  constructor(private http : Http) { }

  getQuarters(): Promise<Quarter[]> {
    return this.http.get("api/quarters")
      .toPromise()
      .then(response => response.json().data as Quarter[])
      .catch(this.handleError);
  }

  getQuarter(id : number): Promise<Quarter> {
    return this.http.get(`api/quarters/${id}`)
      .toPromise()
      .then(response => {
        //console.log(response.json());
        return response.json() as Quarter;}
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
