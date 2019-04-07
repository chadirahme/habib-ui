import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { PaymentsEchartsBarComponent } from './payments-echarts-bar/payments-echarts-bar.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { PaymentsLegendChartComponentComponent } from './payments-legend-chart-component/payments-legend-chart-component.component';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxChartsModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    PaymentsEchartsBarComponent,
    PaymentsLegendChartComponentComponent,
  ],
})
export class DashboardModule { }
