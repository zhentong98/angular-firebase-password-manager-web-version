import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';

import {UserAuthService} from '../../auth/user.auth.service';
import {AesService} from '../../../AESEncryption/aes.service';

import {AngularFirestore} from '@angular/fire/firestore';
import {NgxSpinnerService} from 'ngx-spinner';
import * as XLSX from 'xlsx';
import * as moment from 'moment';


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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public filter_text: string = '';
  private uid: string = '';
  private email: string = '';

  public isLoading: boolean = true;
  public backupList: credentialInterface[] = [];
  public credentialList: credentialInterface[] = [];

  private subs: Subscription;

  constructor(
    private afs: AngularFirestore,
    private userAuthService: UserAuthService,
    private AESService: AesService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    this.initPage();
  }

  private initPage(): void {
    this.spinner.show();
    this.subs = this.userAuthService.userAuth.pipe(
      take(1),
      switchMap(userAuthData => {
        this.uid = userAuthData.uid;
        this.email = userAuthData.email;
        return this.afs.collection<credentialInterface>('credentials',
          ref => ref.where('user_email', '==', this.email)
        ).valueChanges({idField: 'id'});
      }),
      map(credentialList => {
        credentialList.forEach(value => {
          value.title = this.AESService.AESDecrypt(value.title, this.uid);
          value.username = this.AESService.AESDecrypt(value.username, this.uid);
          value.password = this.AESService.AESDecrypt(value.password, this.uid);
          value.url = value.url != null ? this.AESService.AESDecrypt(value.url, this.uid) : null;
        });

        return credentialList;
      })
    ).subscribe(
      (response) => {

        let sortArray = response.sort(function(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          ;
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          ;
          return 0;
        });

        this.backupList = sortArray;
        this.credentialList = sortArray;
        this.isLoading = false;
        this.spinner.hide();
      }
    );
  }

  public onFilter(text: any): void {
    const filterText = text.toLowerCase();
    let filterList = this.backupList.filter(function(currentElement) {
      currentElement.url = currentElement.url == null ? currentElement.url = '' : currentElement.url;
      return currentElement.title.toLowerCase().indexOf(filterText) > -1 || currentElement.username.toLowerCase().indexOf(filterText) > -1 || currentElement.url.toLowerCase().indexOf(filterText) > -1;
    });
    this.credentialList = filterList;
  }

  public exportToExcel(): void {
    this.spinner.show('export');
    const list = this.backupList.slice();

    var wscols = [
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 }
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(list, {header: ['id', 'title', 'username', 'password', 'url','last_modified_on', 'created_on', 'user_email']});
    ws['!cols'] = wscols
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Xover Credentials');
    XLSX.writeFile(wb, moment().unix().toString() + '.xlsx');
    this.spinner.hide('export');
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }


}
