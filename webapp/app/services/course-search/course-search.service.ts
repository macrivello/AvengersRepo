import { Injectable }               from '@angular/core';
import { Http }                     from '@angular/http';

import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Course }                   from '../../models/course.model';

@Injectable()
export class CourseSearchService {
    constructor( private http: Http) {

    }

    private courseString(o: Object): string {
      let c: Course = o as Course;
      return c.department.prefix + " " + c.number + " " + c.title;
    }

    search(term: string): Observable<Course[]> {
      return this.http
        .get("/api/courses")
        .map(response => response.json().filter(c => this.courseString(c).toLowerCase().indexOf(term.toLowerCase()) >= 0) as Course[]);
    }
}
