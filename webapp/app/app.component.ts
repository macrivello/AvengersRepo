import {Component, OnInit} from '@angular/core';
import {User} from './models/user.model';
import {UserService} from './services/user.service';
import {current} from 'codelyzer/util/syntaxKind';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  currentUser: User;
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe();
  }
}
