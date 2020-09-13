import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {CursosService} from '../../servicios/cursos/cursos.service'

@Component({
  selector: 'ngx-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  objetoCursos;
  constructor(private router: Router, private servicioCursos: CursosService) { 

    this.cargarCursos();
  }

  ngOnInit(): void {
  } 

  gotoCurso(codigo: string): void{
    this.router.navigate(['/pages/curso',codigo]);
  }

  cargarCursos(){
    let infoCredenciales=localStorage.getItem('login-mitikas');
    let array=infoCredenciales.split("-");
    let id_profesor=array[3];

   this.servicioCursos.obtenerCursos(id_profesor).subscribe(result=>{
     this.objetoCursos=result;
     console.log(this.objetoCursos);
   }) 
  }

}
