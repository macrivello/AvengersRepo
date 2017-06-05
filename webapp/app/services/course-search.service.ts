import { Injectable }               from '@angular/core';
import { Http }                     from '@angular/http';

import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Course }                   from '../models/course.model';

@Injectable()
export class CourseSearchService {
    constructor( private http: Http) {}

    search(term: string): Observable<Course[]> {
      return this.http
        .get(`/api/courses?term=${term}`)
        .map(response => response.json() as Course[]);
    }
}
