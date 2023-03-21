import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.scss'],
})
export class ModalImagenComponent {
  public ocultarModal: boolean = true;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) {}

  cerrarModal() {
    this.imgTemp = null; //Para que ya no quede la imagen seleccionada
    this.modalImagenService.cerrarModal();
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.modalImagenService.id)
      .then(
        (img) => {
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        },
        (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }
      );
  }

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
}
