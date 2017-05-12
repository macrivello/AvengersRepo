import { Injectable } from '@angular/core';
import { Flowchart} from "../../models/flowchart.model";
import { FlowchartEntry } from "../../models/flowchart-entry.model"
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {toPromise} from "rxjs/operator/toPromise";
import {Observable} from 'rxjs/Observable';
import {Quarter} from '../../models/quarter.model';
import {QuarterView} from '../../models/quarter-view.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FlowchartService {

  private flowchartChanges = new Subject<any>();
  flowchartChanged = this.flowchartChanges.asObservable();

  constructor(private http : Http) { }

  getFlowcharts(): Observable<Flowchart[]> {
    return this.http.get("api/flowcharts")
      .map(response => {
        return response.json() as Flowchart[];
    })
  }

  getFlowchart(id : number): Observable<Flowchart> {
    return this.http.get(`api/flowcharts/${id}`)
      .map(response => {
        return response.json() as Flowchart
      });
  }

  getFirstFlowchart(): Observable<Flowchart> {
    return this.getFlowcharts()
      .first()
      .flatMap((flowcharts) => {
      return this.getFlowchart(flowcharts[0].id);
      });
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete(`api/entries/${id}`)
      .map(() => console.log(`Deleted entry ${id}`))
      .catch(this.handleError);}

  addEntry(entry: FlowchartEntryCompact): Observable<void> {
    return this.http.post(`api/entries/`, entry)
      .map(() => console.log(`Added entry ${JSON.stringify(entry)}`))
      .catch(this.handleError);}

  updateEntry(id: number, entry: FlowchartEntry): Observable<void> {
    return this.http.put(`api/entries/${id}`, entry)
      .map(() => console.log(`Updated entry ${id}`))
      .catch(this.handleError);}

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  updateFlowchart() {
    console.log("updateflowchart");
    this.flowchartChanges.next();
  }
}
