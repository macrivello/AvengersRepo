import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Store} from '@ngrx/store';
import {State} from '../../reducers/flowchart';
import {ResetAction, LoadAction} from '../../actions/flowchart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;

  data = {
    username: "",
    password: ""
  };
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<State>) { }

  ngOnInit() {
    this.userService.logout().subscribe(() => {
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      console.log("signed out, navigate to root");
      this.store.dispatch(new ResetAction());
      this.router.navigate(['/']);
    });
  }

  onSubmit() {
    this.userService.login(this.data.username, this.data.password).subscribe(() => {
      this.store.dispatch(new LoadAction());
      this.router.navigate(['/']);
      }
    )
  }
}
