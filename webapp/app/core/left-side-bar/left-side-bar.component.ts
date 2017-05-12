import { Component, OnInit } from '@angular/core';

import { Flowchart } from '../../models/flowchart.model';
import { FlowchartService } from '../../services/flowchart/flowchart.service'

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css'],

})
export class LeftSideBarComponent implements OnInit {
  flowcharts: Flowchart[];
  constructor(private flowchartService: FlowchartService) {}

  ngOnInit() {
    this.flowchartService.getFlowcharts().subscribe(
      (data) => {
        //console.log(`onNext: ${data[1].name}`);
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
