/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiAuth} from "./@core/services/api.auth";
import {NbWindowModule, NbWindowService, NbDatepickerModule, NbDialogService} from "@nebular/theme";
import {VendorsListComponent} from "./pages/setup/vendors-list/vendors-list.component";
import {AuthGuard} from "./auth-guard.service";
import {NbPasswordAuthStrategy, NbAuthModule} from "@nebular/auth";
import { LoginComponent } from './login/login.component';
//import {FileSelectDirective} from "ng2-file-upload";

@NgModule({
  declarations: [AppComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    //NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    //NbWindowModule.forRoot(),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:8090/',
          login: {
            endpoint: 'rest-employees/getLoginUser',
            method: 'get',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: false,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
          //socialLinks: socialLinks, // social links at the bottom of a page
        },
      },
    }),

  ],
  bootstrap: [AppComponent],
  providers: [ApiAuth,NbWindowService,NbDialogService,AuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  //entryComponents: [VendorsListComponent]
})
export class AppModule {
}
