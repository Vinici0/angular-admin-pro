import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit {

  constructor(
      private settingService: SettingService
  ) { }

  ngOnInit() {
    //recuperar el tema guardado en el localstorage
    customInitFunctions();
  }



}
