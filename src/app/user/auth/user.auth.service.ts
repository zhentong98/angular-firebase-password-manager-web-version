import {ReplaySubject, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

interface userAuthData {
  uid: string,
  email: string
}

@Injectable()

export class UserAuthService {
  userAuth: Subject<userAuthData> = new ReplaySubject<userAuthData>(1);

  constructor() {
  }
}
