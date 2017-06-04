import { Injectable } from '@angular/core';
import { Course } from "../models/course.model"
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {toPromise} from "rxjs/operator/toPromise";
import {isNullOrUndefined} from 'util';
import {isEmpty} from 'rxjs/operator/isEmpty';

@Injectable()
export class CourseService {
  COURSE_DATA_KEY= "COURSE_DATA";
  courses: Map<number, Course>;

  constructor(private http : Http) { }

  initCourseData() {
    this.courses = new Map<number, Course>(JSON.parse(localStorage.getItem(this.COURSE_DATA_KEY)));

    if (isNullOrUndefined(this.courses) || Object.keys(this.courses).length === 0) {
      this.getCourses().then((courses) => {
        let coursesMap = new Map();
        for (let course of courses) {
          coursesMap.set(course.id, course);
        }
        localStorage.setItem(this.COURSE_DATA_KEY, JSON.stringify(Array.from(coursesMap.entries())));
        this.courses = coursesMap;
      });
    }
  }

  getCourses(): Promise<Course[]> {
    return this.http.get("api/courses")
      .toPromise()
      .then(response => response.json() as Course[])
      .catch(this.handleError);
  }

  getCourse(id : number): Promise<Course> {
    return this.http.get(`api/courses/${id}`)
      .toPromise()
      .then(response => {
        //console.log(response.json());
        return response.json() as Course;}
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
