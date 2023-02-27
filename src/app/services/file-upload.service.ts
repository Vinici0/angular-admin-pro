import { Injectable } from '@angular/core';
import { environment } from '../../environments/environmen';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      //Para poder enviar un archivo a traves de un fetch, se debe crear un objeto de tipo FormData
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await resp.json();

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
