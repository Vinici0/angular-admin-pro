import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//Comando para crear un guard: ng g guard guards/auth
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.usuarioService.validarToken().pipe(
      tap(estaAutenticado => {//Si el token es valido, estaAutenticado es true, de lo contrario, false
        if(!estaAutenticado){//Si el token no es valido, redireccionamos al login
          this.router.navigateByUrl('/login');// Redireccionamos al login
        }
      }
    ));
  }
}
