import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { environment } from '../../../environments/environmen';


const base_url = environment.base_url;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[] = []
  public usuario: Usuario;

  constructor(
    private sedingService: SidebarService,
    private usuarioService: UsuarioService
    ) {
      this.usuario = usuarioService.usuario;
      this.menuItems = sedingService.menu;
    console.log(this.menuItems);

  }

  getImageUrl() {
    if (this.usuario.img) {
      return `${base_url}/upload/usuarios/${this.usuario.img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }

}
