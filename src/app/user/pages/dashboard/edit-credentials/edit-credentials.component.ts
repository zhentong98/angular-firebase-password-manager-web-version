import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {UserAuthService} from '../../../auth/user.auth.service';
import {AesService} from '../../../../AESEncryption/aes.service';

import {AngularFirestore} from '@angular/fire/firestore';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {ClipboardService} from 'ngx-clipboard';
import {NgxSpinnerService} from 'ngx-spinner';

interface credentialInterface {
  id: string
  password: string,
  created_on: string,
  title: string,
  url: string,
  user_email: string,
  username: string,
  last_modified_on: string
}

@Component({
  selector: 'app-edit-credentials',
  templateUrl: './edit-credentials.component.html',
  styleUrls: ['./edit-credentials.component.css']
})
export class EditCredentialsComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public isLoading: boolean = true;
  public credentials: credentialInterface;

  private uid: string = '';
  private id: string = '';

  private subs: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private userAuthService: UserAuthService,
    private AESService: AesService,
    private toastr: ToastrService,
    private clipboardService: ClipboardService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initPage();
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

  private initPage() {
    this.spinner.show();
    this.subs = this.userAuthService.userAuth.pipe(
      switchMap(userAuthData => {
        this.uid = userAuthData.uid;
        return this.activatedRoute.params;
      }),
      switchMap(params => {
        this.id = params['id'];
        return this.afs.collection<credentialInterface>('credentials').doc(params['id']).valueChanges();
      }),
      map(credential => {
        credential.title = this.AESService.AESDecrypt(credential.title, this.uid);
        credential.username = this.AESService.AESDecrypt(credential.username, this.uid);
        credential.password = this.AESService.AESDecrypt(credential.password, this.uid);
        credential.url = credential.url != null ? this.AESService.AESDecrypt(credential.url, this.uid) : null;
        return credential;
      })
    ).subscribe(
      (response) => {
        this.form.get('title').setValue(response.title);
        this.form.get('username').setValue(response.username);
        this.form.get('password').setValue(response.password);
        this.form.get('url').setValue(response.url);
        this.credentials = response;
        this.isLoading = false;
        this.spinner.hide();
      }
    );
  }

  public onSave(): void {
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
      last_modified_on: moment().format('D MMM YYYY hh:mm A')
    };

    this.afs.collection('credentials').doc(this.id).set(data, {merge: true}).then(
      () => {
        this.toastr.success('Credentials was updated.', 'Success!');
      }
    );
  }

  public onDelete(): void {
    const status = confirm('Are you sure to delete ' + this.form.get('title').value);

    if (status) {
      this.afs.collection('credentials').doc(this.id).delete().then(() => {
        this.toastr.success('Credentials has been deleted!', 'Success!');
        this.router.navigateByUrl('/dashboard');
      });
    }
  }

  public copyUsername(): void {
    const username = this.form.get('username').value;
    this.clipboardService.copy(username);
    this.toastr.success('Copied to clipboard!', 'Success!');
  }

  public copyPassword(): void {
    const password = this.form.get('password').value;
    this.clipboardService.copy(password);
    this.toastr.success('Copied to clipboard!', 'Success!');
  }

  public openUrl(): void {
    const url = this.form.get('url').value;
    window.open(url, '_black');
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
