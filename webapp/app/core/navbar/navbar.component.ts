import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSignOut() {
    console.log("onSignOut");
    this.userService.logout().subscribe(() => {
      console.log("routing to /login");
      this.router.navigate(['login']);
    })
  }
}
