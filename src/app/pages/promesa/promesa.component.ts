import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit{

  ngOnInit(){
    // this.getUsuarios();
  }

  // async getUsuarios(){
  //   const usuarios = await fetch('https://reqres.in/api/users?page=2');
  //   const {data} = await usuarios.json();
  //   console.log(data);
  // }
}
