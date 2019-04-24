import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {VendorsListComponent} from "./setup/vendors-list/vendors-list.component";
import {ChartModule} from "angular2-chartjs";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NbBadgeModule} from "@nebular/theme";
import {NgxEchartsModule} from "ngx-echarts";
import {ButtonRenderComponent} from "./accounting/payments-supplier/button.render.component";

const PAGES_COMPONENTS = [
  PagesComponent,
  ButtonRenderComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    // ChartModule,
    // NgxEchartsModule,
    // NgxChartsModule,
    NbBadgeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [ButtonRenderComponent]
})
export class PagesModule {
}
