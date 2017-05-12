import { Component, OnInit } from '@angular/core';

import { Flowchart } from '../../models/flowchart.model';
import { FlowchartService } from '../../services/flowchart/flowchart.service'


import { FlowchartEntry } from '../../models/flowchart-entry.model';
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css'],
  //providers:[FlowchartService]
})
export class LeftSideBarComponent implements OnInit {
  flowcharts: Flowchart[];


  // flowcharts: String [] = [
  //   'Flowchart01', 'Flowchart02', 'Flowchart03', 'Flowchart04', 'Flowchart05'
  // ];
  constructor(private flowchartService: FlowchartService) {}

  ngOnInit() {
    this.flowchartService.getFlowcharts().subscribe(
      (data) => {
        console.log(`onNext: ${data[1].name}`);
        this.flowcharts = data;
      },
      err => console.log(err),
      () => console.log('oncomplete')
     );




      // let timer = Observable
      //   .interval(1000)
      //   .take(10)
      //   .timeInterval();
      //
      // timer.subscribe(
      // //data => console.log(`onNext: ${data.value}`),
      // data => console.log(`Flowchart: ${data.}`),
      // error => console.log(`onError: ${error}`),
      // () => console.log(`onComplete`)
      // )



  }



}
