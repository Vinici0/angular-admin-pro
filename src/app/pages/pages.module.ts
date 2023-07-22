import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PipesModule } from '../pipes/pipes.module';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';



@NgModule({
  //Solo funcinoara de manera local en este modulo
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    HospitalesComponent,
    PagesComponent,
    PerfilComponent,
    ProgressComponent,
    PromesaComponent,
    RxjsComponent,
    UsuariosComponent,

  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
    PromesaComponent
  ],
})
export class PagesModule { }
