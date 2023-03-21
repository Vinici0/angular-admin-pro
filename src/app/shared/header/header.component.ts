import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { environment } from '../../../environments/environmen';


const base_url = environment.base_url;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public usuario: Usuario;
  // public patImg = `${base_url}/upload/usuarios/`;
  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
    console.log(this.usuario);
  }



  logout(){
    this.usuarioService.logout();
  }

}
