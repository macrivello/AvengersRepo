import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = {
    username: "",
    password: ""
  };
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('click');
    this.loginService.login(this.data.username, this.data.password).subscribe()
  }
}
