import {NgModule} from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import {AddCredentialsComponent} from './add-credentials/add-credentials.component';
import {EditCredentialsComponent} from './edit-credentials/edit-credentials.component';

import {DashboardRoutingModule} from './dashboard.routing.module';
import {UserSharedModule} from '../../shared/user.shared.module';

import {ClipboardModule} from 'ngx-clipboard';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    DashboardComponent,
    AddCredentialsComponent,
    EditCredentialsComponent,
  ],
  imports: [
    DashboardRoutingModule,
    UserSharedModule,
    ClipboardModule,
    VirtualScrollerModule,
    NgxSpinnerModule
  ],
  exports: [
  ],
  providers: [
  ]
})
export class DashboardModule{

}
