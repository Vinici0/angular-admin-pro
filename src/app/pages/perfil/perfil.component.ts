import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      () => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  // HTMLInputElement
  cambiarImagen(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.imagenSubir = files[0];
    if (!files) {
      return (this.imgTemp = '');
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result as string;
    };

    return this.imgTemp;
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid as string)
      .then(
        (img) => {
          this.usuario.img = img;
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        },
        (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }
      );
  }
}
