import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  public linkTheme = document.querySelector('#theme');

  constructor() {
    const theme =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', theme); //setAttribute - Sirve para establecer un atributo en un elemento
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);//Siempre se guarda en el localstorage
    this.checkCurrentTheme();
  }

    //valida javascript puro -> Si el tema actual es igual al tema que se esta seleccionando
    checkCurrentTheme() {
      const links = document.querySelectorAll('.selector');

      links?.forEach(elem => {
        elem.classList.remove('working');//Elimina la clase working
        const btnTheme = elem.getAttribute('data-theme');//Obtiene el atributo data-theme
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;// Obtiene la url del tema
        const currentTheme = this.linkTheme?.getAttribute('href');//Obtiene la url del tema actual
        if (btnThemeUrl === currentTheme) {
          elem.classList.add('working');
        }
      });
    }
}
