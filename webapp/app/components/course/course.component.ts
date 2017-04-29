import { Component, OnInit } from '@angular/core';
import { Course } from "../../models/course.model";
import {CourseService} from "../../services/course/course.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course : Course;

  constructor(private courseService : CourseService) { }

  ngOnInit() {
    this.courseService.getCourse(40)
      .then(
        course => {
          console.log(course);
          this.course = course});
  }

}
