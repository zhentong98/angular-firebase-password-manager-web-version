import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserAuthService} from '../user.auth.service';

import {AngularFireAuth} from '@angular/fire/auth';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public hasError: boolean = false;
  public errorMessage: string = '';

  public form: FormGroup;
  private subs: Subscription;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userAuthService: UserAuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    const uid = localStorage.getItem('uid') ? atob(localStorage.getItem('uid')) : null;

    if (uid) {
      this.router.navigateByUrl('dashboard');
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      })
    });
  }

  public onLogin(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.spinner.show();
    // Login function
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(result => {
      const uid = result.user.uid;

      let authData = {
        uid: uid,
        email: email
      }

      localStorage.setItem('uid', btoa(JSON.stringify(authData)));
      this.userAuthService.userAuth.next({uid: uid, email: email});
      this.router.navigateByUrl('/dashboard');
      this.spinner.hide();
    })
      .catch(error => {
        this.hasError = true;
        this.errorMessage = error.message;
      });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
