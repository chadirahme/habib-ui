import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {PffComponent} from "./pff.component";
import {SalesComponent} from "./sales/sales.component";
const routes: Routes = [
  {
    path: '',
    component: PffComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'sales',
        component: SalesComponent
      },
    ]
  },

  // {
  //   path: '',
  //   redirectTo: 'pff',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PffRoutingModule {
}
