import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserAuthService} from '../user.auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  public onRegister(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.spinner.show()
    // Register function
    this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;

        let authData = {
          uid: uid,
          email: email
        };

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

}
