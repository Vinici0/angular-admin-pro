import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  //Solo funcinoara de manera local en este modulo
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
})
export class PagesModule { }
