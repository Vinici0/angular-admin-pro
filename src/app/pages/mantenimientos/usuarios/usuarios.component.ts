import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { environment } from '../../../../environments/environmen';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

const base_url = environment.base_url;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[] = [];
  public totalUsuarios: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService,
    private modalImagenService: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    //Para que no se cargue accidentalmente la imagen de otro usuario al editar su perfil
    this.imgSubs.unsubscribe();//Para que no se quede escuchando o ejecutando el código del subscribe
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    //TODO:No se hace nada con la respuesta, solo se llama al servicio para que se ejecute el código que está en el subscribe
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(
          (resp) => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error');
          }
        );
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe((resp) => {
      console.log(resp);
    });
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);

    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarUsuarios();
    }

    this.busquedaService
      .buscar('usuarios', termino)
      .subscribe((resp: Usuario[]) => {
        // console.log(resp);
        this.usuarios = resp;
      });
  }
}
