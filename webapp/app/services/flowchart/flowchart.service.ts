import { Injectable } from '@angular/core';
import { Flowchart} from "../../models/flowchart.model";
import { FlowchartEntry } from "../../models/flowchart-entry.model"
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {toPromise} from "rxjs/operator/toPromise";

@Injectable()
export class FlowchartService {

  constructor(private http : Http) { }

  getFlowcharts(): Promise<Flowchart[]> {
    return this.http.get("/flowcharts")
      .toPromise()
      .then(response => response.json().data as Flowchart[])
      .catch(this.handleError);
  }

  getFlowchart(id : number): Promise<Flowchart> {
    return this.http.get(`/flowcharts/${id}`)
      .toPromise()
      .then(response => {
        //console.log(response.json());
        return response.json() as Flowchart;}
        )
      .catch(this.handleError);
  }

  getEntry(id : number): Promise<FlowchartEntry> {
    return this.http.get(`/entries/${id}`)
      .toPromise()
      .then(response => {
        console.log(response.json());
        return response.json() as FlowchartEntry;}
      )
      .catch(this.handleError);
  }
  /*
  putEntry(entry : FlowchartEntry) : Promise<any> {
    return this.http.put(`/entries/${entry.id}`, entry)
      .toPromise();
  }
*/
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
