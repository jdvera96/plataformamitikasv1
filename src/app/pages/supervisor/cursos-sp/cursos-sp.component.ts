import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {CursosService} from '../../../servicios/supervisor/cursos/cursos.service'
import {TareasSpService} from '../../../servicios/supervisor/tareas/tareas-sp.service'
import {CalificacionService} from '../../../servicios/supervisor/calificaciones/calificacion.service'
import {AsistenciaService} from '../../../servicios/supervisor/asistencias/asistencia.service'


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

import * as $ from 'jquery';
import { TareaService } from '../../../servicios/profesor/tareas/tarea.service';

@Component({
  selector: 'ngx-cursos-sp',
  templateUrl: './cursos-sp.component.html',
  styleUrls: ['./cursos-sp.component.scss']
})
export class CursosSpComponent implements OnInit {

  id_supervisor: string; 
  objectCursos: any;
  objectSesiones: any;
  objectTareas:any;

  closeResult = '';

  pdfContenido: any[]=[];

  constructor(private servicioCurso: CursosService,private servicioTarea: TareasSpService,
              private servicioCalificaciones: CalificacionService,
              private servicioAsistencias: AsistenciaService,
              private modalService: NgbModal,
              private servicioTareas: TareaService
    ) { }

  ngOnInit(): void {

    //obtener datos del local storage
    let data=localStorage.getItem('login-mitikas');
    let arreglo=data.split('-');
    this.id_supervisor=arreglo[3];

    //cargamos los cursos asignados al supervisor
    this.cargarCursos();
    

    this.detectarSelect();

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

  cargarSesiones(id_clase){
    this.servicioTarea.obtenerSesiones(id_clase).subscribe(result=>{
      this.objectSesiones=result;
      
      this.consultarTareas(id_clase);

    })
  }
  cargarTareas(id_clase){
    this.servicioTareas.obtenerTareas(id_clase).subscribe(result=>{
      return result;
      
    }) 
  }


  detectarSelect(){
      
    //limpiando div de selectores tareas y asistencias
    $('#div_tareas').html(" ")
    $('#div_sesiones').html(" ")

      let select_accion=$('#accion_select').val();
      let select_cursos=$('#curso_select').val();

      console.log('id curso: ',select_cursos);

      if(select_accion==2){

        this.servicioCalificaciones.obtenerTareas(select_cursos).subscribe(result=>{
          this.mostrarSelectorTareas(result);
        })

      }else{
        
        if(select_accion==3){
          this.servicioAsistencias.obtenerSesiones(select_cursos).subscribe(result=>{
            this.mostrarSelectorSesiones(result);

          })
        }
      }

  }
  

  //-------- accion del button CONSULTAR------------
  accionConsultar(){
    let select_cursos=$('#curso_select').val()
    let select_accion=$('#accion_select').val()
    
    if(select_cursos==null || select_accion==null){
      console.log('no ha seleccionado');
    }else{
      console.log('puede consultar')

      if(select_accion=='1'){
        //cargo las sessiones y dentro hago la consulta de las tareas
        //this.cargarSesiones(select_cursos);
        //this.cargarTareas(select_cursos);
        //Cargar tabla de tareas
        this.consultarTareas(select_cursos);       

      }else if(select_accion=='2'){
        console.log('consultar calificaciones');

        let select_tarea=$('#tarea_select').val()
        this.consultarCalificaciones(select_tarea);
      }else if(select_accion=='3'){
        console.log('consultar asistencias')
        let select_sesion=$('#sesion_select').val()
        this.consultarAsistencias(select_sesion);
      
      }else if(select_accion=='4'){
        console.log('mostrar Listado del curso');
        this.consultarListado(select_cursos);

      }

    }
  }


  //----- seccion consultas principales
  consultarTareas(id_clase){
    this.servicioTarea.obtenerTareas(id_clase).subscribe(result=>{
      console.log(result);
      this.mostrarTablaTareas(result);      
    })
  }

  consultarCalificaciones(id_tarea){

    this.servicioCalificaciones.obtenerCalificaciones_Estudiantes(id_tarea).subscribe(result=>{
      console.log(result);
      this.mostrarTablaCalificaciones(result);
    })
    
  }

  consultarAsistencias(id_sesion){

    this.servicioAsistencias.obtenerAsistencia_Estudiantes(id_sesion).subscribe(result=>{
      console.log('asistencias: ',result);
      this.mostrarTablaAsistencias(result);      
    })
    
  } 

  consultarListado(id_curso){
    this.servicioCurso.obtenerListado(id_curso).subscribe(result=>{
      this.mostrarTablaListado(result);
    });
  }

  //--------- funciones de utilidad -------------------
  encontrarSesionByID(id_sesion){
    for(let i=0;i<this.objectSesiones.length;i+=1){
      if(this.objectSesiones[i].id==id_sesion){
        return this.objectSesiones[i].titulo;
      }
    }

    return null;
  }

  //--------- seccion de mostrar tablas  --------------

  mostrarTablaTareas(data){
    this.pdfContenido=[]
    let table=$(`<table id="descarga-tabla" class="table" style='background-color:#fff;'></table>`);

    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Modulo</th>
                        <th scope="col">Fecha Creación</th>
                        <th scope="col">Fecha Entrega</th>
                        <th scope="col">Descripcion</th>
                      </tr>
                    </thead>`);
    
    let body=$(`<tbody></tbody>`);
    this.pdfContenido.push(["Nombre","Modulo","Fecha Creación","Fecha Entrega"])

    
    for(let i=0;i<data.length;i+=1){

      //obtengo el nombre de la sesion mediante el id_sesion
      //let nombre_sesion=this.encontrarSesionByID(data[i].id_sesion);

      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].nombre_tarea}</td>
                    <td>${data[i].id_sesion.titulo}</td>
                    <td>${data[i].fecha_creacion}</td>
                    <td>${data[i].fecha_entrega}</td>
                    
                    <td>
                      <button onclick="document.getElementById('id01').style.display='block'" class="btn btn-sm btn-success seeButton" id="${data[i].id}">
                        <i class="far fa-eye"></i>&nbsp; Ver
                      </button>
                    </td>
                  </tr>`)
      this.pdfContenido.push([data[i].nombre_tarea,data[i].id_sesion.titulo,data[i].fecha_creacion,data[i].fecha_entrega])
      body.append(fila);
      table.append(body);
      $('#show_data').append(table);
      $("#"+data[i].id).click(function(){
        console.log("Se asigno data");
        //obteniendo datos de la tarea
        $.get("https://patricioxavi10.pythonanywhere.com/api/getTarea/"+data[i].id, function(data2, status){
          console.log(data2);
          //asignando al modal
          $("#campo_titulo").text(data2['nombre_tarea']);
          $("#campo_sesion").text(data2['id_sesion']["titulo"]);
          $("#campo_descripcion").text(data2['descripcion_tarea']);
          $("#campo_fecha").text(data2['fecha_creacion']);
        });
  
      })
    }
    
    table.append(cabecera);
    //agregando al html
    //$('#show_data').html(" ")
    
  }

  fillInfo(id_tarea){
    console.log("Funcion")
    this.servicioTarea.obtenerInfoTarea(id_tarea).subscribe(result=>{

      $("#campo_titulo").text(result['nombre_tarea']);
      $("#campo_sesion").text(result['id_sesion']["titulo"]);
      $("#campo_descripcion").text(result['descripcion_tarea']);
      $("#campo_fecha").text(result['fecha_creacion']);
    });
  }

  mostrarTablaCalificaciones(data){
    this.pdfContenido=[]
    let table=$(`<table id="descarga-tabla" class="table" style='background-color:#fff;'></table>`);
    
    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Apellidos y Nombres</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Calificacion</th>
                        
                      </tr>
                    </thead>`);
    
    this.pdfContenido.push(["Nombre","Estado","Calificacion"])
    let body=$(`<tbody></tbody>`);

    console.log(data)
    
    for(let i=0;i<data.length;i+=1){

      if(data[i].estado==false){
        data[i].estado='Sin calificar'
      }

      if(data[i].calificacion==null){
        data[i].calificacion=0
      }

      if(data[i].calificacion >= 70)
        data[i].estado='Aprobado'
      else 
        data[i].estado='Reprobado'
      

      //formateando nombres y apellidos
      let nombre=data[i].id_estudiante.nombres.split(' ')[0]
      

      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].id_estudiante.apellidos} ${data[i].id_estudiante.nombres}</td>
                    <td>${data[i].estado}</td>
                    <td>${data[i].calificacion}</td>
                   
                  </tr>`)
      this.pdfContenido.push([data[i].id_estudiante.apellidos +" "+ data[i].id_estudiante.nombres,data[i].estado,data[i].calificacion])
      body.append(fila);
    }
    
    table.append(cabecera);
    table.append(body);


    //agregando al html
    $('#show_data').html(" ")
    $('#show_data').append(table);

  }

  mostrarTablaAsistencias(data){
    let table=$(`<table id="descarga-tabla" class="table" style='background-color:#fff;'></table></table>`);
    this.pdfContenido=[];
    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Apellidos y Nombres</th>
                        <th scope="col">Asistencias</th>
    
                      </tr>
                    </thead>`);
    this.pdfContenido.push(["Apellidos y Nombres","Asistencias"])
    let body=$(`<tbody></tbody>`);
    
    for(let i=0;i<data.length;i+=1){
      let asistencia;
      if(data[i].asistencia)
        asistencia="Asistió"
      else
        asistencia="No Asistió"
      let fila=$(`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${data[i].id_estudiante.apellidos} ${data[i].id_estudiante.nombres}</td>
                    <td>${asistencia}</td>
                   
                   
                  </tr>`)
      this.pdfContenido.push([data[i].id_estudiante.apellidos +" "+ data[i].id_estudiante.nombres
                  ,asistencia])
      body.append(fila);
    }
    
    table.append(cabecera);
    table.append(body);


    //agregando al html
    $('#show_data').html(" ")
    $('#show_data').append(table);

  }

  mostrarTablaListado(listaCurso){
    console.log(listaCurso);
    let table=$(`<table id="descarga-tabla" class="table" style='background-color:#fff;'></table></table>`);
    this.pdfContenido=[]
    let cabecera=$(`<thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Apellidos y Nombres</th>
                        <th scope="col">Rol</th>
    
                      </tr>
                    </thead>`);
    this.pdfContenido.push(["Apellidos y Nombres","Rol"])
    let body=$(`<tbody></tbody>`);
    
    let fila_profesor=$(`<tr>
                          <th scope="row">1</th>
                          <td>${listaCurso.id_profesor.apellidos} ${listaCurso.id_profesor.nombres}</td>
                          <td>Profesor</td>
                        </tr>`)
    this.pdfContenido.push([listaCurso.id_profesor.apellidos +" "+ listaCurso.id_profesor.nombres
                        ,"Profesor"])
    //agrego la primera fila a la tabla de datos
    body.append(fila_profesor);
    
    //recorro la lista de alumnos y agrego al body de la tabla
    let listaEstudiantes=listaCurso.id_estudiante
    
    for(let i=0;i<listaEstudiantes.length;i+=1){
      let fila=$(`<tr>
                    <th scope="row">${i+2}</th>
                    <td>${listaEstudiantes[i].apellidos} ${listaEstudiantes[i].nombres}</td>
                    <td>Alumno</td>
                   
                   
                  </tr>`)
      this.pdfContenido.push([listaEstudiantes[i].apellidos +" "+ listaEstudiantes[i].nombres
                  ,"alumno"])
      body.append(fila);
    }
    
    table.append(cabecera);
    table.append(body);


    //agregando al html
    $('#show_data').html(" ")
    $('#show_data').append(table);

  }



  mostrarSelectorTareas(tareas){

      //cargando el selector con tareas al html
      let p=$(`<p class="titulo_h2"style='font-weight:bold;margin-top:1%'>Elija una tarea</p>`);
      let selector=$(`<select class="form-control" id="tarea_select" >
                        <option value="" selected disabled>Seleccione una tarea</option>
                    </select>`);

      for(let i=0;i<tareas.length;i+=1){
          let opcion=$(`<option value="${tareas[i].id}" >${tareas[i].nombre_tarea}</option>`)
          selector.append(opcion);
      }
      
      $('#div_tareas').html(" ")
      $('#div_tareas').append(p);                    
      $('#div_tareas').append(selector);
  }

  mostrarSelectorSesiones(sesiones){

    //cargando el selector con tareas al html
    let p=$(`<p class="titulo_h2" style='font-weight:bold;margin-top:1%'>Elija un Modulo</p>`);
    let selector=$(`<select class="form-control" id="sesion_select" >
                      <option value="" selected disabled>Seleccione un modulo</option>
                  </select>`);

    for(let i=0;i<sesiones.length;i+=1){
        let opcion=$(`<option value="${sesiones[i].id}" >${sesiones[i].titulo}</option>`)
        selector.append(opcion);
    }
    
    $('#div_sesiones').html(" ")
    $('#div_sesiones').append(p);                    
    $('#div_sesiones').append(selector);
  }


  //---------------funciones para modales ----------------
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

  tareaInfoView(content,id_tarea){
    this.servicioTarea.obtenerInfoTarea(id_tarea).subscribe(data=>{
      if(data){
        console.log(data)
        
        this.openView(content)
        
        this.servicioTarea.obtenerInfoSesion(data["id_sesion"]).subscribe(dataSesion=>{
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

  generatePdf(){
    
    console.log(this.pdfContenido)
    var docDefinition = {

      content: [
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            body: this.pdfContenido
          }
        }
      ]
    };
    
    pdfMake.createPdf(docDefinition).open();
   }

}
