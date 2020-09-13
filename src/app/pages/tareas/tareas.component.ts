import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'; 
import {TareaService} from '../../servicios/profesor/tareas/tarea.service'

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'

import * as $ from 'jquery';
import { NotificacionesService } from '../../servicios/notificaciones/notificaciones.service';

@Component({
  selector: 'ngx-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  id_clase: string;
  objectAllTareas: any;
  objectTareas: any[] = [];
  objectSesiones: any;

  val01=false;
  val02=false;
  val03=false;

  closeResult = '';

  constructor(private router: Router,
              private location: Location,
              private servicioTareas: TareaService,
              private activador: ActivatedRoute,
              private modalService: NgbModal,
              private servicioNotificaciones: NotificacionesService) {

   }

  ngOnInit(): void {
    this.id_clase=this.activador.snapshot.paramMap.get('id');
    this.obtenerTareas();
    this.obtenerSesionesPorClase();
    
  }

  openCrear(content) {    

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('dio click en crear');
      
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openView(content) {

    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-view'}).result.then((result) => {
      console.log('dio click en Cerrar');
      
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  obtenerTareas(){
    this.servicioTareas.obtenerTareas(this.id_clase).subscribe(result=>{      
        this.objectAllTareas=result;            
      console.log(this.objectAllTareas.length);
    }) 
  }

  actualizarTareas(){
    this.objectTareas=[];
    for(let i=0; i<this.objectAllTareas.length;i++){
      let object=this.objectAllTareas[i];
      console.log(object["id_sesion"]["id"]);
      console.log($("#select_sesion option:selected").val());
      if(object["id_sesion"]["id"]==$("#select_sesion option:selected").val())
        this.objectTareas.push(object);
    }
    console.log(this.objectTareas)
  }

  obtenerSesionesPorClase(){
    this.servicioTareas.obtenerSesiones(this.id_clase).subscribe(result=>{
      console.log('sesiones: ',result);
      this.objectSesiones=result;
    })
  }

  nuevaTarea(){
    this.router.navigate(['/pages/nuevaTarea']);
  }

  crearTarea(){
    //this.resetValidation()
    if(!this.validationView())
      return false;

    //obteniendo data del modal
    let sesion=$("#tarea_select_sesion option:selected").val();
    let titulo=$("#input_titulo").val();
    let descripcion=$("#input_descripcion").val();
    let fechaEntrega=$("#input_fecha").val();
    let dataStorage=localStorage.getItem("login-mitikas");
    let array=dataStorage.split("-")
    let id_profesor=array[3]

    console.log("Informacion");    
    console.log(sesion);
    console.log(titulo);
    console.log(descripcion);
    console.log(id_profesor);

    this.servicioTareas.registrarTarea(id_profesor,sesion,titulo,descripcion,fechaEntrega).subscribe(result=>{
      console.log('result: ',result);

      if(result){
        
        
        let objeto={"titulo": titulo,"descripcion":descripcion,"id_clase":this.id_clase}
        console.log(objeto);
        this.servicioNotificaciones.enviarNotificacionPorClase(objeto).subscribe(result=>{
          console.log(result);
          Swal.fire(
            'Exito',
            'Tarea creada exitosamente',
            'success'
          )
        })
        
        this.obtenerTareas();
        this.modalService.dismissAll();
      }else{
        console.log("error");
      }
    })
    this.obtenerTareas();
    this.actualizarTareas();
    

  }


  tareaInfoView(content,id_tarea){
    this.servicioTareas.obtenerInfoTarea(id_tarea).subscribe(data=>{
      if(data){
        console.log(data)
        
        this.openView(content)
        
        this.servicioTareas.obtenerInfoSesion(data["id_sesion"]["id"]).subscribe(dataSesion=>{
            //asignando informacion a los input del modal detalles
            $("#view_input_sesion").val(dataSesion["titulo"]);
            $("#view_input_titulo").val(data['nombre_tarea']);
            $("#view_input_descripcion").val(data['descripcion_tarea']);

        })


      }else{
        console.log('error en obtener tarea')
      }
    })
  }

  deleteTarea(id_tarea){

    this.servicioTareas.obtenerInfoTarea(id_tarea).subscribe(infoTarea=>{

      Swal.fire({
        title: `Eliminar tarea ${infoTarea["nombre_tarea"]}?`,
        text: "Esta acción no se podrá revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          
          this.servicioTareas.eliminarTarea(id_tarea).subscribe(result=>{
            if(result){
              console.log('tarea eliminada');
              
              Swal.fire(
                'Tarea eliminada!',
                `Tarea ${infoTarea["nombre_tarea"]} ha sido eliminada`,
                'success'
              )
              this.obtenerTareas();
              this.actualizarTareas();
            }
          })

          
        }
      })

    })
    
  }

  goToBack(){
    this.location.back();
  }

  validationView():boolean{
    
    let titulo=$("#input_titulo").val();
    if(titulo.length==0)
      this.val01=true;
    else
      this.val01=false;
    let fecha=$("#input_fecha").val();
    if(fecha.length==0)
      this.val02=true;
    else
      this.val02=false;
    let descripcion=$("#input_descripcion").val();
    if(descripcion.length==0)
      this.val03=true;
    else
      this.val03=false;
    if(this.val01 || this.val02 || this.val03)
      return false;
    return true;
  }
  resetValidation(){
    this.val01=false;
    this.val02=false;
  }


}
