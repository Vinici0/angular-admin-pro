import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environmen';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class HospitalesService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarUsuarios() {
    const url = `${base_url}/hospitales`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales)
    );
  }
}
