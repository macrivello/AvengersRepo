import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {isNullOrUndefined} from 'util';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;

  data = {
    username: "",
    password: ""
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              public checklogin: boolean) {  }

  signInWarning() {
    console.log('entered signInWarning');
    this.checklogin = true;
}

  ngOnInit() {

  }

  onSubmit() {
    this.userService.login(this.data.username, this.data.password)
      .catch((error: any) => {
        if (error.status === 401)
        {
          this.signInWarning();
          console.log('It is a 401');
        }

        return Observable.throw(new Error(error.status));
      })
      .subscribe(() => {
        this.router.navigate(['/']);
      }
    )
  }
}
