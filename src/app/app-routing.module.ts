import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {AuthGuard} from "./auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {SalesComponent} from "./pff/sales/sales.component";
import {PffLayoutComponent} from "./@theme/layouts/pff/pff.layout";
import {SampleLayoutComponent} from "./@theme/layouts/sample/sample.layout";

const routes: Routes = [
  { path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: 'app/pages/pages.module#PagesModule' },

   { path: 'pff',
    //canActivate: [AuthGuard],
     //component: SalesComponent,//PffLayoutComponent,
     loadChildren: 'app/pff/pff.module#PffModule'
   },

  // {
  //   path: 'pff',
  //   //canActivate: [AuthGuard],
  //   component: PffLayoutComponent,
  //   //loadChildren: 'app/pff/pff.module#PffModule'
  //   children: [
  //     {
  //       path: 'sales',
  //       loadChildren: 'app/pff/pff.module#PffModule'
  //       //component: SalesComponent,//NbLoginComponent
  //     },
  // ]
  // },


  // { path: 'sales1',
  //   //canActivate: [AuthGuard],
  //  // component: SampleLayoutComponent,//PffLayoutComponent,
  //   //loadChildren: 'app/pff/pff.module#PffModule'
  //   children: [
  //     {
  //       path: '',
  //       component: SalesComponent,//NbLoginComponent
  //     },
  //   ]
  // },

  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,//NbLoginComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: 'sales', redirectTo: 'sales' },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
