import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import {PffRoutingModule} from "./pff-routing.module";
import {PffComponent} from "./pff.component";
import {SalesComponent} from "./sales/sales.component";
import {RouterModule} from "@angular/router";
import { SellitemComponent } from './sellitem/sellitem.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {MiscellaneousModule} from "../pages/miscellaneous/miscellaneous.module";

const PAGES_COMPONENTS = [
  PffComponent,
  SalesComponent,
];

@NgModule({
  imports: [
    RouterModule,
    PffRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    MiscellaneousModule,
   // DashboardModule,
    //MiscellaneousModule,
    // ChartModule,
    // NgxEchartsModule,
    // NgxChartsModule,
    //NbBadgeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    SellitemComponent,
  ],
  entryComponents: []
})
export class PffModule {

}
