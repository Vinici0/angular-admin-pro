import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environmen';

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

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/hospitales`;
    return this.http.get(url, this.headers);

  }
}
