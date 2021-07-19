import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserAuthService} from '../../auth/user.auth.service';

import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userAuthService: UserAuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.userAuthService.userAuth.next(null);
    localStorage.removeItem('uid');
    this.router.navigateByUrl('/auth/login');
  }


}
