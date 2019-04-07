import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import {ApiAuth} from "../../../@core/services/api.auth";

@Component({
  selector: 'payments-echarts-bar',
  template: `
     <payments-legend-chart-component [legendItems]="chartLegend"></payments-legend-chart-component>
    <div echarts [options]="options" class="echart" ></div>
  `,
})
export class PaymentsEchartsBarComponent implements AfterViewInit, OnDestroy {
  private alive = true;
  options: any = {};
  themeSubscription: any;
  chartLegend: {iconColor: string; title: string}[];
  currentTheme: string;
  year2017:any[];
  year2018:any[];

  constructor(private themeService: NbThemeService,private authService: ApiAuth) {
    this.themeService.getJsTheme()
        .pipe(takeWhile(() => this.alive))
        .subscribe(theme => {
          const orderProfitLegend = theme.variables.orderProfitLegend;

          this.currentTheme = theme.name;
          this.setLegendItems(orderProfitLegend);
        });
  }

  ngOnInit() {
    console.log("onlint");
    this.loadData();
    console.log("onlint1");

  }

  loadData(): void {
    try
    {
      this.year2017=[];
      this.year2018=[];
      this.authService.getPaymentsYearList().subscribe(data => {
        let payments2017 = data["2017"];
        for (var j=0; j<12; j++) {
          let payment = payments2017[j];
          this.year2017.push(payment["total"]);
        }
        let payments2018 = data["2018"];
        for (var j=0; j<12; j++) {
          let payment = payments2018[j];
          this.year2018.push(payment["total"]);
        }
        //let resource = resources[0];
        //console.log(resource["total"]);
        //this.year1.push(resource["total"]);

        //console.log(this.year1);

        this.loadngAfterViewInit();

      //   this.options = {
      //     series: [
      //       {
      //         name: '2017',
      //         type: 'bar',
      //         barWidth: '30%',
      //         data: this.year2017,//[50, 5, 200, 334, 390, 330, 220],
      //       },
      //       {
      //         name: '2018',
      //         type: 'bar',
      //         barWidth: '40%',
      //         data: this.year2018,//[100, 10, 200, 334, 390, 330, 220,11,222,333],
      //       },
      //     ],
      //   }

       });

    }
    catch (e) {
      console.log(e);
    }
  }

  setLegendItems(orderProfitLegend) {
    this.chartLegend = [
      {
        iconColor: '#719efc',//orderProfitLegend.firstItem,
        title: '2017',
      },
      {
        iconColor: '#5dcfe3',//orderProfitLegend.secondItem,
        title: '2018',
      },
      // {
      //   iconColor: orderProfitLegend.thirdItem,
      //   title: 'All orders',
      // },
    ];
  }
  ngAfterViewInit(){
    console.log("ngAfterViewInit");
  }
  loadngAfterViewInit() { //ngAfterViewInit
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        //color: [colors.primaryLight, colors.infoLight],
        color: ['#719efc', '#5dcfe3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        // title: {
        //   text: 'Monthly Average Rainfall'
        // },
        // subtitle: {
        //   text: 'Source: WorldClimate.com'
        // },
        // legend: {
        //   left: 'left',
        //   data: ['Line 1', 'Line 2', 'Line 3'],
        //   textStyle: {
        //     color: echarts.textColor,
        //   },
        //   display: true,
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [ 'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: '2017',
            type: 'bar',
            barWidth: '30%',
            data: this.year2017,//[50, 5, 200, 334, 390, 330, 220],
          },
          {
            name: '2018',
            type: 'bar',
            barWidth: '40%',
            data: this.year2018,//[100, 10, 200, 334, 390, 330, 220,11,222,333],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
