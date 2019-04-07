import {Component, Input} from '@angular/core';
import {NgxLegendItemColor} from "./enum.legend-item-color";

@Component({
  selector: 'payments-legend-chart-component',
  templateUrl: './payments-legend-chart-component.component.html',
  styleUrls: ['./payments-legend-chart-component.component.scss']
})
export class PaymentsLegendChartComponentComponent {

  /**
   * Take an array of legend items
   * Available iconColor: 'green', 'purple', 'light-purple', 'blue', 'yellow'
   * @type {{iconColor: string; title: string}[]}
   */
  @Input()
  legendItems: { iconColor: NgxLegendItemColor; title: string }[] = [];

}
