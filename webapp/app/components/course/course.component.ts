import { Component, OnInit } from '@angular/core';
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  constructor() { }

  ngOnInit() {
  //   this.course = new Course();
  //   this.course.title="Software Engineering";
  //   this.course.number=309;
  //   this.course.department={
  //     id: 12,
  //     prefix: "CPE"
  //   };
     }
}
