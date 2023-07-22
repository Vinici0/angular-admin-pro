import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../../services/hospitales.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  constructor(
    private  hospitalesService: HospitalesService
  ) { }

  ngOnInit(): void {
    this.cargandoHospitales();
  }

  cargandoHospitales() {
    this.cargando = true;
    this.hospitalesService.cargarUsuarios()
    .subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  eliminarHospital(hospital: Hospital) {
    console.log(hospital);
  }

  guardarCambios(hospital: Hospital) {
    console.log(hospital);
  }


  abrirModal(hospital: Hospital) {
    console.log(hospital);
  }

  abrirSweetAlert() {
    Swal.fire('Hola mundo');
  }





  buscar(termino: string) {
    console.log(termino);
  }


}
