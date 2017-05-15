import { Injectable } from '@angular/core';
import { Flowchart} from "../models/flowchart.model";
import {FlowchartEntry, FlowchartEntryCompact} from "../models/flowchart-entry.model"
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {QuarterView} from '../models/quarter-view.model';
import {isNullOrUndefined} from "util";
import {UserService} from './user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FlowchartView} from '../models/flowchart-view.model';

@Injectable()
export class FlowchartService {

  private currentFlowchartID: number;
  private flowchartsMap = new Map<number, Flowchart>();

  private flowchartSource = new BehaviorSubject<Flowchart>(new Flowchart());
  private flowchart$ = this.flowchartSource.asObservable();


  private flowchartsSource = new BehaviorSubject<Flowchart[]> ([]);
  private flowcharts$ = this.flowchartsSource.asObservable();


  constructor(private http : Http){}

  // TODO: Make this more clear
  getFlowcharts(): Observable<Flowchart[]> {
    return this.http.get("api/flowcharts")
      .map(response => {
        return response.json() as Flowchart[];
    })
  }

  private buildFlowchartMap(flowcharts: Flowchart[]): Map<number, Flowchart> {
    let flowchartMap = new Map();
    for (let flowchart of flowcharts)
    {
      flowchartMap.set(flowchart.id, flowchart);
    }

    return flowchartMap;
  }

  getCurrentFlowchart() : Observable<Flowchart>
  {
    return this.flowchart$;
  }

  getAllFlowcharts(): Observable<Flowchart[]> {
    return this.flowcharts$;
  }

  setCurrentFlowchartByIDInMap(id : number)
  {
    //TODO
    //Does not check if the key is in the map
    this.currentFlowchartID = id;
    this.flowchartSource.next(this.flowchartsMap.get(this.currentFlowchartID));
  }

  getCurrentFlowchartFromMap() : Observable<Flowchart>
  {
    return Observable.of(this.flowchartsMap.get(this.currentFlowchartID));
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
    console.log(`Deleting Entry ${entry.id} from flowchart ${this.currentFlowchartID}. User: ${UserService.getCurrentUser().email}` );
    this.http.delete(`api/entries/${entry.id}`)
      .catch(this.handleError)
      .toPromise()
      .then(() => {
        console.log(`Deleted entry ${entry.id}. Updating Flowchart.`)
        this.updateFlowchart();
      });
    }

  addEntry(entry: FlowchartEntryCompact): void {
    console.log(`Adding Entry ${JSON.stringify(entry)}. User: ${UserService.getCurrentUser().email}` );
    this.http.post(`api/entries/`, entry)
      .catch(this.handleError)
      .toPromise()
      .then(() => {
        console.log(`Adding Entry ${JSON.stringify(entry)}. User: ${UserService.getCurrentUser().email}` );
        this.updateFlowchart();
    });
  }

  updateEntry(id: number, entry: FlowchartEntry): Observable<void> {
    return this.http.put(`api/entries/${id}`, entry)
      .map(() => console.log(`Updated entry ${id}`))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // TODO: Make this more clear
  updateFlowchart() {
    console.log('updateFlowchart');
    if (isNullOrUndefined(this.currentFlowchartID)){
      this.flowchartSource.next(null); // return null flowchart
      return;
    }

    this.getFlowchart(this.currentFlowchartID)
      .toPromise()
      .then((flowchart) => {
        this.flowchartsMap.set(flowchart.id, flowchart); //update local map
        this.flowchartSource.next(flowchart);
    });
  }

  // TODO: Make this more clear
  updateAllFlowcharts() {
    console.log("updateAllFlowcharts");
    this.getFlowcharts()
      .toPromise()
      .then((flowcharts) => {
        this.flowchartsMap = this.buildFlowchartMap(flowcharts);

        if(isNullOrUndefined(this.currentFlowchartID) && flowcharts.length > 0){
          this.currentFlowchartID = flowcharts[0].id;
        }

        this.flowchartSource.next(this.flowchartsMap.get(this.currentFlowchartID));
        this.flowchartsSource.next(flowcharts);
      });
  }

  clearData() {
    console.log("clearing local flowchart data");
    this.currentFlowchartID = null;
    this.flowchartsMap.clear();
    this.flowchartSource.next(null);
    this.flowchartsSource.next(null);
  }

  // This is a utility method
  static parseQuarters(flowchart: Flowchart): QuarterView[] {
    if (isNullOrUndefined(flowchart)
      || isNullOrUndefined(flowchart.entries)
      || flowchart.entries.length === 0) {

      return [];
    }

    let quarters = new Map();
    for (let entry of flowchart.entries){
      const quarterId = entry.quarter.id;

      // Populate list of QuarterViews
      let quarterView = quarters.get(quarterId); // check if QuarterView for quarter exists
      if (isNullOrUndefined(quarterView)) {
        quarterView = new QuarterView();
        quarterView.quarter = entry.quarter;
        quarters.set(quarterId, quarterView)
      }

      quarterView.entries.push(entry); // add entry to quarter
    }

    //TODO return the map sorted ?
    return Array.from(quarters.values());
  }

  // This is a utility method
  static buildFlowchartView(flowchart: Flowchart): FlowchartView {
    return {flowchart: flowchart, quarters: FlowchartService.parseQuarters(flowchart)};
  }
}
