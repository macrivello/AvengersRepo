import { Component, OnInit } from '@angular/core';
import {Quarter } from "../../models/quarter.model";
import { QuarterService} from "../../services/quarter/quarter.service"

@Component({
  selector: 'app-quarter',
  templateUrl: './quarter.component.html',
  styleUrls: ['./quarter.component.css']
})
export class QuarterComponent implements OnInit {

  quarter : Quarter;

  constructor(private quarterService : QuarterService) { }

  ngOnInit() {
    this.quarterService.getQuarter(13)
      .then(
        quarter => {
          console.log(quarter);
          this.quarter = quarter});
  }
}
