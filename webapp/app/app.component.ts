import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private http: Http) { }

  ngOnInit(): void {
    this.http.get('/test')
      .toPromise()
      .then(response => this.title = response.text())
      .catch(error => console.log(error));
  }
}
