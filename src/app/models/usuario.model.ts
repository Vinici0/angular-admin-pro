import { environment } from "src/environments/environmen";

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public google?: boolean,
    public password?: string,
    public role?: string,
    public img?: string,
    public uid?: string,
  ) {}



  get imagenUrl() {

    if (!this.img) {
      return `${base_url}/upload/usuarios/no-image`;
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}
