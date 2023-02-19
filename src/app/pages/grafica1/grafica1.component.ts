import { Component } from '@angular/core';
import { DonaComponent } from 'src/app/components/dona/dona.component';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public  labelsTienda1 = 'Tienda .1';
  public  labelsTienda2 = 'Tienda .2';
  public  labelsTienda3 = 'Ti .3';
  public data1: number[] = [10, 10, 100];
}
