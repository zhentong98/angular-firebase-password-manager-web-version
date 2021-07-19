import {NgModule} from '@angular/core';

import {UserRoutingModule} from './user.routing.module';
import {UserSharedModule} from './shared/user.shared.module';
import {UserAuthService} from './auth/user.auth.service';
import {UserGuard} from './auth/user.guard';

import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';

import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    UserRoutingModule,
    UserSharedModule,
    VirtualScrollerModule,
    NgxSpinnerModule
  ],
  exports: [],
  providers: [
    UserAuthService,
    UserGuard
  ]
})

export class UserModule {

}
