import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environmen';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from './cargar-usuarios.interface';

const base_url = environment.base_url;
declare const gapi: any; //Objeto global de google para poder usar la autenticacion de google
declare const google: any; //Objeto global de google para poder usar la autenticacion de google

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any; //Una vez que termine la promesa, se va a guardar la informacion de la autenticacion de google
  public usuario: Usuario;

  constructor(private router: Router, private http: HttpClient) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  logout = () => {
    localStorage.removeItem('token');
    google.accounts.id.revoke(this.usuario.email, () => {
      this.router.navigateByUrl('/login');
    });
  };

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '234828725258-vj7ppojei10l24rfkm970n4jna86b6iq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin', // Sirve para que el usuario no tenga que estar logueado en google para poder usar la autenticacion de google
        });
        resolve(); //Sirve para que el metodo googleInit retorne una promesa
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        //Sirve para comprobar si el token es valido
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        // Solo si el token es valido, lo guardamos en el localstorage la nueva version del token
        map((resp: any) => {
          //Nueva version del token para renovar la sesion del usuario en caso de que se haya vencido
          // console.log('Informacion del usuario: ', resp.usuario);
          const { email, google, nombre, role, img = '', uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, google, '', role, img, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        // Si el token es valido, retornamos true, de lo contrario, false
        catchError((error) => {
          return of(false); //Si el token no es valido, retornamos false y creamos un observable
        })
      );
  }

  login(formData: LoginForm) {
    //El post trae la informacion que se envia al backend
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        console.log(resp);
        localStorage.setItem('token', resp.token);
      })
    );
  }

  crearUsuario(formData: RegisterForm) {
    //El post trae la informacion que se envia al backend
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil(data: { email: string; nombre: string; role?: string }) {
    data = {
      ...data,
      role: this.usuario.role,
    };

    console.log('Informacion del usuario: ');
    console.log(data);
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,this.headers);
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers).pipe(
      map((resp) => {//Obtenemos la informacion de los usuarios
        const usuarios = resp.usuarios.map(//Mapeamos la informacion de los usuarios
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              user.google,
              '',
              user.role,
              user.img,
              user.uid
            )
        );
        return {
          total: resp.total,
          usuarios,
        };
      }
      )
    );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}

