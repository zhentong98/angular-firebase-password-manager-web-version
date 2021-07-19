import {NgModule} from '@angular/core';

import {LoginComponent} from './auth/login/login.component';

import {AdminGuard} from './auth/admin.guard';
import {AdminAuthService} from './auth/admin.auth.service';
import {AdminSharedModule} from './shared/admin.shared.module';
import {AdminRoutingModule} from './admin.routing.module';

// import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AdminRoutingModule,
    AdminSharedModule,
    // NgxSpinnerModule
  ],
  exports: [
  ],
  providers: [
    AdminGuard,
    AdminAuthService
  ]
})

export class AdminModule{

}
