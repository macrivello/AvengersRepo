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
import {isNull, isNullOrUndefined} from "util";

@Injectable()
export class FlowchartService {

  private currentFlowchartID: number;
  private flowcharts = new Map<number, Flowchart>();

  private flowchartSource = new Subject<Flowchart>();
  private flowchart$ = this.flowchartSource.asObservable();


  constructor(private http : Http) { }

  getFlowcharts(): Observable<Map<number, Flowchart>> {
    return this.http.get("api/flowcharts")
      .map(response => {
        let flowcharts = response.json() as Flowchart[];
        for (let flowchart of flowcharts)
        {
          if (isNullOrUndefined(this.currentFlowchartID))
          {
            this.currentFlowchartID = flowcharts[0].id;
          }
          this.flowcharts.set(flowchart.id, flowchart);
        }
        this.updateFlowchart();
        return this.flowcharts;
    })
  }

  getCurrentFlowchart() : Observable<Flowchart>
  {
    return this.flowchart$;
  }

  setCurrentFlowchartByIDInMap(id : number)
  {
    //TODO
    //Does not check if the key is in the map
    this.currentFlowchartID = id;
    this.flowchartSource.next(this.flowcharts.get(this.currentFlowchartID));
  }

  getFlowchartMap() : Map<number, Flowchart>
  {
    return this.flowcharts;
  }

  getCurrentFlowchartFromMap() : Observable<Flowchart>
  {
    return Observable.of(this.flowcharts.get(this.currentFlowchartID));
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

  getEntry(id : number): Promise<FlowchartEntry> {
    return this.http.get(`api/entries/${id}`)
      .toPromise()
      .then(response => {
        return response.json() as FlowchartEntry;}
      )
      .catch(this.handleError);
  }

  deleteEntry(id: number): Promise<void> {
    return this.http.delete(`api/entries/${id}`)
      .toPromise()
      .then(() => console.log(`Deleted entry ${id}`))
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

  updateFlowchart() {
    console.log("updateflowchart" + JSON.stringify(this.flowcharts.get(this.currentFlowchartID)));
    this.flowchartSource.next(this.flowcharts.get(this.currentFlowchartID));
  }
}
