import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

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
              private router: Router) { }

  ngOnInit() {
    this.userService.logout().subscribe(() => {
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      console.log("signed out, navigate to root");
      this.router.navigate(['/']);
    });
  }

  onSubmit() {
    this.userService.login(this.data.username, this.data.password).subscribe(() => {
      this.router.navigate(['/']);
      }
    )
  }
}
