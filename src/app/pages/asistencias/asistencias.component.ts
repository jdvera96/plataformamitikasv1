import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'; 
import {AsistenciaService} from '../../servicios/profesor/asistencias/asistencia.service'

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'

import * as $ from 'jquery';


@Component({
  selector: 'ngx-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.scss']
})
export class AsistenciasComponent implements OnInit {

  id_clase: string;
  objectSesiones: any;
  objectEstudiantes :any;


  constructor(private router: Router,
              private location: Location,
              private servicioAsistencia: AsistenciaService,
              private activador: ActivatedRoute,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id_clase=this.activador.snapshot.paramMap.get('id');
    this.obtenerSesionesPorClase();
  }


  obtenerSesionesPorClase(){
    this.servicioAsistencia.obtenerSesiones(this.id_clase).subscribe(result=>{
      console.log('sesiones: ',result);
      this.objectSesiones=result;
    })
  }

  cargarEstudiantes(){
    console.log("cargar estudiantes")
    //obteniendo el valor del select/opcion
    let id_sesion=$("#sesion_select option:selected").val();
    console.log(id_sesion)

    if(id_sesion)
      this.servicioAsistencia.obtenerAsistencia_Estudiantes(id_sesion).subscribe(result=>{
        this.objectEstudiantes=result;
      })
    
  }

  asignarAsistencias(){

    let arrayElegidos=[];

    let id_sesion=$("#sesion_select option:selected").val();
    let elementPadre=$('#t_body_asistencias');
    elementPadre.find(".asistencia").attr("disabled",true);
    let arrayHijos=elementPadre.find(".asistencia");
    let arrayIdEstudiante=elementPadre.find(".fila");
    console.log(arrayHijos);
    console.log(arrayIdEstudiante);

    //recorriendo cada tr
    for(let i=0;i<arrayHijos.length;i+=1){
      console.log(arrayHijos[i].checked);
      console.log(arrayIdEstudiante[i].id);

      arrayElegidos.push({'id_estudiante': arrayIdEstudiante[i].id,'asistencia': arrayHijos[i].checked, 'asistido':true})
      
    }


    for(let i=0;i<arrayElegidos.length;i+=1){
      this.servicioAsistencia.asignarAsistencia(id_sesion,arrayElegidos[i].id_estudiante,arrayElegidos[i].asistencia,arrayElegidos[i].asistido).subscribe(result=>{
        console.log(result)
        
      })
    }

    Swal.fire(
      'Exito',
      'Asitencias actualizadas exitosamente',
      'success'
    )
  }

  goToBack(){
    this.location.back();
  }


}
