import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

declare function customInitFunction(): void;

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
    customInitFunction();
  }
}
