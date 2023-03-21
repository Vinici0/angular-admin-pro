import { Component } from '@angular/core';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent {


  buscar(termino: string) {
    console.log(termino);
  }







}
