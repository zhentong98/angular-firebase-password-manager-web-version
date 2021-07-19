import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {AddCredentialsComponent} from './add-credentials/add-credentials.component';
import {EditCredentialsComponent} from './edit-credentials/edit-credentials.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'add-credentials',
        component: AddCredentialsComponent
      },
      {
        path: 'edit-credentials/:id',
        component: EditCredentialsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class DashboardRoutingModule {

}
