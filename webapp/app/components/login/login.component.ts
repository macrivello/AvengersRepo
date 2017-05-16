import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {isNullOrUndefined} from 'util';

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

  ngOnInit() {}

  onSubmit() {
    this.userService.login(this.data.username, this.data.password).subscribe(() => {
      this.router.navigate(['/']);
      }
    )
  }
}
