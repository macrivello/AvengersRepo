import { Injectable } from '@angular/core';
import { Flowchart} from "../../models/flowchart.model";
import {FlowchartEntry, FlowchartEntryCompact} from "../../models/flowchart-entry.model"
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {toPromise} from "rxjs/operator/toPromise";
import {Observable} from 'rxjs/Observable';
import {Quarter} from '../../models/quarter.model';
import {QuarterView} from '../../models/quarter-view.model';
import {Subject} from 'rxjs';
import {isNull, isNullOrUndefined} from "util";
import {UserService} from '../user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FlowchartService {

  private currentFlowchartID: number;
  private flowcharts = new Map<number, Flowchart>();

  private flowchartSource = new BehaviorSubject<Flowchart>(new Flowchart());
  private flowchart$ = this.flowchartSource.asObservable();

  constructor(private http : Http,
              private userService: UserService) { }

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

  deleteEntry(entry: FlowchartEntry): void {
    console.log(`Deleting Entry ${entry.id} from flowchart ${this.currentFlowchartID}. User: ${this.userService.getCurrentUser().email}` );
    this.http.delete(`api/entries/${entry.id}`)
      .catch(this.handleError)
      .toPromise()
      .then(() => {
        console.log(`Deleted entry ${entry.id}. Updating Flowchart.`)
        this.updateFlowchart();
      });
    }

  addEntry(entry: FlowchartEntryCompact): void {
    console.log(`Adding Entry ${JSON.stringify(entry)}. User: ${this.userService.getCurrentUser().email}` );
    this.http.post(`api/entries/`, entry)
      .catch(this.handleError)
      .toPromise()
      .then(() => {
        console.log(`Adding Entry ${JSON.stringify(entry)}. User: ${this.userService.getCurrentUser().email}` );
        this.updateFlowchart();
    });
  }

  updateEntry(id: number, entry: FlowchartEntry): Observable<void> {
    return this.http.put(`api/entries/${id}`, entry)
      .map(() => console.log(`Updated entry ${id}`))
      .catch(this.handleError);}

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  updateFlowchart() {
    console.log('updateFlowchart');
    this.getFlowchart(this.currentFlowchartID)
      .toPromise()
      .then((flowchart) => {
        this.getFlowchartMap().set(flowchart.id, flowchart); //update local map
        this.flowchartSource.next(flowchart);
      })
  }
}
