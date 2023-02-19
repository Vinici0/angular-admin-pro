import { Component } from '@angular/core';
import { SidebarService } from 'src/app/service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[] = []

  constructor(
    private sedingService: SidebarService
  ) {
    this.menuItems = sedingService.menu;
    console.log(this.menuItems);

  }

}
