import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {UserAuthService} from './user.auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userAuthService: UserAuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userAuthData = (localStorage.getItem('uid') ? JSON.parse(atob(localStorage.getItem('uid'))) : null) as {
      uid: string,
      email: string
    };

    if (userAuthData) {
      this.userAuthService.userAuth.next(userAuthData);
      return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
