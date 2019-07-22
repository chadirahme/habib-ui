import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'setup',
      loadChildren: './setup/setup.module#SetupModule',
    },
    {
      path: 'accounting',
      loadChildren: './accounting/accounting.module#AccountingModule',
    },
    // {
    //   path: 'pff',
    //   loadChildren: './pff/pff.module#PffModule',
    // },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
