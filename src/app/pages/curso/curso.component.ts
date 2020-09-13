import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { CursosService } from '../../servicios/cursos/cursos.service';

@Component({
  selector: 'ngx-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  
  id: string= '';
  curso: string="";
  constructor(private router: Router, private activador: ActivatedRoute, private servicioCursos: CursosService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }



  ngOnInit(): void {
    this.id=this.activador.snapshot.paramMap.get('id');
    
    this.cargarCursos(this.id);
  }

  goToTareas(){
    this.router.navigate([`/pages/${this.id}/tareas`]);
  }

  goToCalificaciones(){
    this.router.navigate([`/pages/${this.id}/calificaciones`]);
  }

  gotToAsistencias(){
    this.router.navigate([`/pages/${this.id}/asistencias`]);
  }

  cargarCursos(_id:string){    
    let infoCredenciales=localStorage.getItem('login-mitikas');
    let array=infoCredenciales.split("-");
    let id_profesor=array[3];

   this.servicioCursos.obtenerCursos(id_profesor).subscribe(result=>{
    for(var i=0;i<result["length"];i++){
      if(result[i]["id_curso"]["id"]==_id){
        this.curso= result[i]["id_curso"]["titulo_curso"];
        return;
      }
    }
    this.curso= "Error";
   })
   
  }


  /* ActualizarMenu(): void{
      if(MENU_ITEMS.length==3)
      //agregando opciones al menu cuando esta en un curso
      MENU_ITEMS.push({
        title: 'Tareas',
        icon: 'home-outline',
        link: '/pages/tareas',
      },{
        title: 'Calificaciones',
        icon: 'home-outline',
        link: '/pages/calificaciones',
      },{
        title: 'Asistencias',
        icon: 'home-outline',
        link: '/pages/asistencias',
      })
  } */

}
