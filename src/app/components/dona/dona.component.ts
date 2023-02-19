import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
})
export class DonaComponent {
  @Input() title: string = 'Sin título';
  @Input() data2: number[] = [350, 450, 100];
  @Input() labelsTienda1: string = 'Tienda 1';
  @Input() labelsTienda2: string = 'Tienda 2';//Para los datos
  @Input() labelsTienda3: string = 'Tienda 3';


  doughnutChartLabels: string[] =  [this.labelsTienda1, this.labelsTienda2, this.labelsTienda3];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.data2,
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
}
