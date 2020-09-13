import { Component, OnInit } from '@angular/core';
import {NotificacionesService} from '../../servicios/notificaciones/notificaciones.service'
import * as $ from 'jquery';
import { CursosService } from '../../servicios/supervisor/cursos/cursos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'ngx-notificaciones-sp',
  templateUrl: './notificaciones-sp.component.html',
  styleUrls: ['./notificaciones-sp.component.scss']
})
export class NotificacionesSPComponent implements OnInit {
  
  id_supervisor: string; 
  objectCursos: any;
  curso:boolean=false;
  val01=false;
  val02=false;

  constructor(private servicioNotificaciones: NotificacionesService,
    private servicioCurso: CursosService) { }

  ngOnInit(): void {
    
    
    //obtener datos del local storage
    let data=localStorage.getItem('login-mitikas');
    let arreglo=data.split('-');
    this.id_supervisor=arreglo[3];

    //cargamos los cursos asignados al supervisor
    this.cargarCursos();
  }

  sendNotificacion(){
    if(!this.validationView())
      return false;
    let titulo=$('#notificacion_titulo').val();
    let descripcion=$('#notificacion_descripcion').val();
    let grupo=$('#notificacion_grupo').val();

    if(grupo=="Todos"){
      let objeto={"titulo": titulo,"descripcion":descripcion}
      this.servicioNotificaciones.enviarNotificacion(objeto).subscribe(result=>{
        console.log(result);
        Swal.fire(
          'Exito',
          'Notificacion enviada correctamente',
          'success'
        )
      }) 
    }else if(grupo=="Por curso"){
      let curso=$('#notificacion_curso').val();
      let id = $('#notificacion_curso option[value="'+curso+'"]').attr("id");
        //var id=$(this).children("selected").attr("id");
        let objeto={"titulo": titulo,"descripcion":descripcion,"id_clase":id}
        console.log(objeto);
        this.servicioNotificaciones.enviarNotificacionPorClase(objeto).subscribe(result=>{
          console.log(result);
          Swal.fire(
            'Exito',
            'Notificacion enviada correctamente',
            'success'
          )
        })
      
    }else{
      let objeto={"titulo": titulo,"descripcion":descripcion,"grupo":grupo};
      console.log(objeto);
      this.servicioNotificaciones.enviarNotificacionPorGrupo(objeto).subscribe(result=>{
        console.log(result);
        Swal.fire(
          'Exito',
          'Notificacion enviada correctamente',
          'success'
        )
      }) 
    }
  }

  verificarIDsupervisor(){ // verifica si el id del supervisor esta cargado
    if(this.id_supervisor!=null){
      return 1;
    }else{
      return 0;
    }
  }

  cargarCursos(){
    if(this.verificarIDsupervisor){
      this.servicioCurso.obtenerCursos(this.id_supervisor).subscribe(result=>{
        console.log('cursos: ',result);
        this.objectCursos=result;
      });
    }else{
      console.log('error con id supervisor');
    }
  }

  validationView():boolean{
    
    let direccion=$("#notificacion_titulo").val();
    if(direccion.length==0)
      this.val01=true;
    else
      this.val01=false;
    let telefono=$("#notificacion_descripcion").val();
    if(telefono.length==0)
      this.val02=true;
    else
      this.val02=false;
    
    if(this.val01 || this.val02)
      return false;
    return true;
  }
  resetValidation(){
    this.val01=false;
    this.val02=false;
  }

}
