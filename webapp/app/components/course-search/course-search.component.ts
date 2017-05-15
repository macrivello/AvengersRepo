import {Component, Inject, OnInit, Optional}            from '@angular/core';
import { Router }                       from '@angular/router';
import { Observable }                   from 'rxjs/Observable';
import { Subject }                      from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { CourseSearchService }          from '../../services/course-search.service';
import { Course }                       from '../../models/course.model';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Quarter} from '../../models/quarter.model';

@Component({
    selector: 'app-course-search',
    templateUrl: './course-search.component.html',
    styleUrls: ['./course-search.component.css'],
    providers: [CourseSearchService]
})

export class CourseSearchComponent implements OnInit {
    courses: Observable<Course[]>;
    callingQuarter: Quarter;

    private searchTerms = new Subject<string>();

    constructor(
        public dialogRef: MdDialogRef<CourseSearchComponent>,
        @Optional() @Inject(MD_DIALOG_DATA) public data: Quarter,
        private courseSearchService: CourseSearchService,
        private router: Router) {

      this.callingQuarter = data;
    }

    search(term: string): void {
        if (term.length >= 2) {
          this.searchTerms.next(term);
        }
    }

    ngOnInit(): void {
        this.courses = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term ? this.courseSearchService.search(term)
                : Observable.of<Course[]>([]))
            .catch(error => {
                console.log("Error getting courses.");
                console.log(error);
                return Observable.of<Course[]>([]);
            });
    }

    onCourseSelected(course: Course){

    }
}
