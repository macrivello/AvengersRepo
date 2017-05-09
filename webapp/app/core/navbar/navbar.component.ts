import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router, RouterModule} from '@angular/router';
import {Flowchart} from '../../models/flowchart.model';
import {Store} from '@ngrx/store';
import {FlowchartState} from '../../reducers/flowchart';
import {RESET, ResetAction} from '../../actions/flowchart';
import {User} from '../../models/user.model';
import {UserState} from '../../reducers/user';
import {LogoutAction} from '../../actions/user';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user: User;

  constructor(userService: UserService,
              private router: Router,
              private userStore: Store<UserState>) {
  }

  ngOnInit() {
    // Get signed in state, async pipe user in template
    console.log(`navbar init ${JSON.stringify(this.user)}`);
  }

  onSignOut() {
    console.log("onSignOut");
    this.userStore.dispatch(new LogoutAction());
  }
}
