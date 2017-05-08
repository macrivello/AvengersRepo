import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, RouterModule} from '@angular/router';
import {Flowchart} from '../../models/flowchart.model';
import {Store} from '@ngrx/store';
import {State} from '../../reducers/flowchart';
import {RESET, ResetAction} from '../../actions/flowchart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService,
              private router: Router,
              private store: Store<State>) {
  }

  ngOnInit() {
    // Get signed in state, async pipe user in template
  }

  onSignOut() {
    console.log("onSignOut");
    this.userService.logout().subscribe(() => {
      console.log("routing to /login");
      this.store.dispatch(new ResetAction());
      this.router.navigate(['login']);
    })
  }
}
