import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'; 
import {CalificacionService} from '../../servicios/profesor/calificaciones/calificacion.service'

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'

import * as $ from 'jquery';
@Component({
  selector: 'ngx-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit {

  id_clase: string;

  objectEstudiantes: any;
  objectTareas: any; 

  constructor(private router: Router,
    private location: Location,
    private servicioCalificacion: CalificacionService,
    private activador: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void { 
    this.id_clase=this.activador.snapshot.paramMap.get('id');

    this.obtenerTareas();
  }


  obtenerTareas(){
    this.servicioCalificacion.obtenerTareas(this.id_clase).subscribe(result=>{
      this.objectTareas=result;
      console.log(this.objectTareas);
    }) 
  }

  cargarEstudiantes(){
    console.log("cargar estudiantes")
    //obteniendo el valor del select/opcion
    let id_tarea=$("#tarea_select option:selected").val();
    console.log(id_tarea)

    if(id_tarea)
      this.servicioCalificacion.obtenerCalificaciones_Estudiantes(id_tarea).subscribe(result=>{
        this.objectEstudiantes=result;
      })
    
  }


  guardarCalificacion(){
      //obteniendo calificacion y id_tarea
      let arrayElegidos=[];

      //let t_table=$(`#${id_estudiante}`)
      
      let elementPadre=$('#t_body_calificaciones');
      let id_tarea=$("#tarea_select option:selected").val();
      elementPadre.find(".nota").attr("disabled",true);
      let arrayHijos=elementPadre.find(".nota");
      let arrayIdEstudiante=elementPadre.find(".fila");


      for(let i=0;i<arrayHijos.length;i+=1){
        if(arrayHijos[i].value !=""){
          arrayElegidos.push({'id_estudiante': arrayIdEstudiante[i].id,'calificacion': arrayHijos[i].value})
                  
          console.log(arrayIdEstudiante[i].id);
          console.log(arrayHijos[i].value);
          arrayHijos
        }

      }
      for(let i=0;i<arrayElegidos.length;i+=1){
        this.servicioCalificacion.asignarCalificacion(arrayElegidos[i].calificacion,id_tarea,arrayElegidos[i].id_estudiante).subscribe(result=>{        
        })        
      }
      Swal.fire(
        'Exito',
        'Calificacion asignada exitosamente',
        'success'
      )
      /*this.servicioCalificacion.asignarCalificacion(calificacion,id_tarea,id_estudiante).subscribe(result=>{
        if(result){
          console.log("calificacion asignada");

          Swal.fire(
            'Exito',
            'Calificacion asignada exitosamente',
            'success'
          )

          this.cargarEstudiantes();
        }
      })*/
  }


  goToBack(){
    this.location.back();
  }

}
