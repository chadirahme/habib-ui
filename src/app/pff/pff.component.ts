import { Component } from '@angular/core';

@Component({
  selector: 'ngx-components',
  template: `
    <!--<pff-layout>-->
    <!--<div class="container">-->
      <router-outlet></router-outlet>
      <!--</div>-->
    <!--</pff-layout>-->
  `,
})
export class PffComponent {
  test: any;
}


// <div>
//     <app-header></app-header>
// <div class="container">
//     <router-outlet></router-outlet>
//     </div>
//     </div>