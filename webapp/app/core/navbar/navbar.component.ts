import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() onClicked = new EventEmitter();
  currentUser$: Observable<User>;

  constructor(private userService: UserService,
              private router: Router) {

      this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit() {}

  onSignOut() {
    console.log("onSignOut");
    this.userService.logout().subscribe(() => {
      console.log("routing to /login");
      this.router.navigate(['login']);
    })
  }

  onClick() {
    console.log('clicked')
    this.onClicked.emit();
  }
}
