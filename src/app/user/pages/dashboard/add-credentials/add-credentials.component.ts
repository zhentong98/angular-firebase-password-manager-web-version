import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

import {AesService} from '../../../../AESEncryption/aes.service';
import {UserAuthService} from '../../../auth/user.auth.service';

import * as moment from 'moment';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-credentials',
  templateUrl: './add-credentials.component.html',
  styleUrls: ['./add-credentials.component.css']
})
export class AddCredentialsComponent implements OnInit {

  public form: FormGroup;

  private uid: string = '';
  private email: string = '';

  constructor(
    private AESService: AesService,
    private userAuthService: UserAuthService,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initPage();
    this.initForm();
  }

  private initPage(): void {
    this.userAuthService.userAuth.pipe(
      take(1),
    ).subscribe(
      (userAuthData) => {
        this.uid = userAuthData.uid;
        this.email = userAuthData.email;
      }
    );
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      username: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      url: new FormControl(null)
    });
  }

  onSave(): void {

    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    const url = this.form.get('url').value ? this.AESService.AESEncrypt(this.form.get('url').value, this.uid) : null;

    let data = {
      title: this.AESService.AESEncrypt(this.form.get('title').value, this.uid),
      username: this.AESService.AESEncrypt(this.form.get('username').value, this.uid),
      password: this.AESService.AESEncrypt(this.form.get('password').value, this.uid),
      url: url,
      user_email: this.email,
      created_on: moment().format('D MMM YYYY h:m A')
    };

    this.afs.collection('credentials').add(data).then(
      (response) => {
        this.form.reset();
        this.router.navigate(['/dashboard/edit-credentials/', response.id]);
        this.toastr.success('Credentials has been added.', 'Success!');
      }
    );
  }


}
