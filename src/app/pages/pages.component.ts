import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import {CursosService} from '../servicios/cursos/cursos.service'

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  constructor(private servicioCursos: CursosService) { 
    var login=localStorage.getItem('login-mitikas');
    if(login!=null){
      let array=login.split('-');
      if(array[0]=='Profesor'){
         if( this.menu["1"]["children"].length==0)
            this.cargarCursos();
      }
    }
  }

  cargarCursos(){
    let infoCredenciales=localStorage.getItem('login-mitikas');
    let array=infoCredenciales.split("-");
    let id_profesor=array[3];

   this.servicioCursos.obtenerCursos(id_profesor).subscribe(result=>{
    
    for(var i=0;i<result["length"];i++){
      var curso=result[i]["id_curso"]["titulo_curso"];
      if(curso.length>30){
        curso=curso.substring(0,30)+"...";
      }
      var ele={
        "title":curso,
        "link":"/pages/curso/"+result[i]["id_curso"]["id"]
      }
      this.menu["1"]["children"].push(ele);
    }

   }) 
  
  }

  
}
