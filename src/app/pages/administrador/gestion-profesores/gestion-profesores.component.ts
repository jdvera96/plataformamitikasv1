import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import {ProfesorService} from '../../../servicios/administrador/profesores/profesor.service'

import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { EstudianteService } from '../../../servicios/administrador/estudiantes/estudiante.service';


@Component({
  selector: 'ngx-gestion-profesores',
  templateUrl: './gestion-profesores.component.html',
  styleUrls: ['./gestion-profesores.component.scss']
})
export class GestionProfesoresComponent implements OnInit {

  profesoresObject: any;
  respaldoProfesoresObject: any;
  closeResult = '';

  countryData: any[];
  cityData: any[];
  cities: any[];
  country:string;
  key=true;

  val01=false;
  val02=false;
  val03=false;
  val04=false;
  val05=false;
  val06=false;
  val07=false;
  val08=false;
  val09=false;
  val10=false;
  val11=false;
  val12=false;
  val13=false;
  val14=false;

  constructor(private modalService: NgbModal,
              private adminService: ProfesorService,
              private estudianteService: EstudianteService
    ) { }

  ngOnInit(): void {
    this.obtenerTodos();
    this.inicializarPaises();
    this.inicializarCiudades();
  }


  crearProfesor():boolean{
    if(!this.validationRegister())
      return false;
    let email=$('#view_inputCrear_correo').val();
    let password=$('#view_inputCrear_password').val();
    let rol='profesor';
    let nombres=$('#view_inputCrear_nombres').val();
    let apellidos=$('#view_inputCrear_apellidos').val();
    let cedula=$('#view_inputCrear_cedula').val()
    let fecha=$('#view_inputCrear_fecha').val();
    let direccion=$('#view_inputCrear_direccion').val();
    let telefono=$('#view_inputCrear_telefono').val();
    let escolaridad=$('#view_inputCrear_escolaridad').val();
    let pais=$('#view_inputCrear_pais').val();
    let ciudad=$('#view_inputCrear_ciudad').val();
    
    let sexo=$('#view_inputCrear_sexo').val()

    let data={
      "email": email,
      "password": password,
      "rol": rol,
      "profile": {
          "nombres": nombres,
          "apellidos": apellidos,
          "cedula": cedula,
          "fecha_nacimiento": fecha,
          "direccion": direccion,
          "telefono": telefono,
          "escolaridad": escolaridad,
          "pais": pais,
          "ciudad": ciudad,
          "sexo": sexo,
          "estado": true
      }

    }

    console.log('data: ',data);

    this.adminService.crearProfesor(data).subscribe(result=>{
      console.log('result: ',result);
      if(result){
        Swal.fire(
          'Exito',
          ' Profesor creado exitosamente',
          'success'
        )

        this.obtenerTodos();
      }else{
        //manejar error 400 del servidor
      }
    })
    return true;
  }

  profesorCrearView(content){
    this.resetValidation();
    this.openView(content);

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

  obtenerTodos(){
    this.adminService.obtenerTodosProfesores().subscribe(result=>{
      console.log("resultado: ",result)
      this.profesoresObject=result;
      this.respaldoProfesoresObject=result;
    })
  }

  profesorInfoView(content,id_profesor){
    this.resetValidation()
    this.adminService.obtenerInfoProfesor(id_profesor).subscribe(data=>{
      if(data){
        console.log(data)
        
        this.openView(content)

        let nombres= data['apellidos'] +' ' + data['nombres'] 
        $("#view_input_nombres").val(nombres);
        $("#view_input_cedula").val(data['cedula']);
        $("#view_input_direccion").val(data['direccion']);
        $("#view_input_telefono").val(data['telefono']);
        $("#view_input_fecha").val(data['fecha_nacimiento']);
        $("#view_input_escolaridad").val(data['escolaridad']);
        this.country=data['pais'];
        this.key=true;
        $("#view_input_ciudad").val(data['ciudad']);
        $("#view_input_sexo").val(data['sexo']);
        

      }else{
        console.log('error en obtener Profesor')
      }
    })
  }

  desbloquearCampos(){

    //bloqueo el button de habilitar edicion
    $("#btn_habilitar").attr('disabled','disabled');

    
    $("#view_input_nombres").removeAttr('disabled');
    $("#view_input_telefono").removeAttr('disabled');
    $("#view_input_direccion").removeAttr('disabled');
    $("#view_input_fecha").removeAttr('disabled');
    $("#view_input_escolaridad").removeAttr('disabled');
    $("#view_input_pais").removeAttr('disabled');
    $("#view_input_ciudad").removeAttr('disabled');
    $("#view_input_sexo").removeAttr('disabled');
    
   
  }

  guardarCambios():boolean{
    if(!this.validationView())
      return false;
    let nombres_apelllidos=$("#view_input_nombres").val();

    let arreglo=nombres_apelllidos.split(' ')

    let apellidos=arreglo[0]+" "+arreglo[1];
    let nombres=arreglo[2] + " "+arreglo[3];

    let cedula=$("#view_input_cedula").val();
    let direccion=$("#view_input_direccion").val();
    let telefono=$("#view_input_telefono").val();
    let escolaridad=$("#view_input_escolaridad").val();
    let fecha=$('#view_input_fecha').val()
    let pais=$("#view_input_pais").val();
    let ciudad=$("#view_input_ciudad").val();
    let sexo=$("#view_input_sexo").val();

    let data={
              "nombres": nombres,
              "apellidos": apellidos,
              "cedula": cedula,
              "fecha_nacimiento": fecha,
              "direccion": direccion,
              "telefono": telefono,
              "escolaridad": escolaridad,
              "pais": pais,
              "ciudad": ciudad,
              "sexo": sexo,
              "estado": true
  }

    this.adminService.actualizarInfoProfesor(cedula,data).subscribe(result=>{
        console.log('respuesta',result);

        if(result){

          Swal.fire(
            'Exito',
            ' actualizacion exitosa',
            'success'
          )

          this.obtenerTodos();

        }

    })
    return true;
  }

  deleteProfesor(id_profesor){
    this.adminService.eliminarProfesor(id_profesor).subscribe(result=>{

      this.adminService.obtenerInfoProfesor(id_profesor).subscribe(result=>{
        Swal.fire({
          title: `Eliminar profesor: \n ${result["nombres"]} ${result["apellidos"]}?`,
          text: "Esta acción no se podrá revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'

        }).then((resultado) => {
          console.log('resultado: ',resultado)
          if (resultado.value) {
            
            this.adminService.eliminarProfesor(id_profesor).subscribe(result=>{
              if(result){
                console.log('Profesor eliminado');
                
                Swal.fire(
                  'Profesor eliminado!',
                  `Profesor ${result["nombres"]} ${result["apellidos"]} ha sido eliminado`,
                  'success'
                )
  
                this.obtenerTodos();
              }
            })
  
            
          }
        })
  
      })

    })
  }

  onKey(event){
    //capturo lo que el usuario escribe 
    console.log(event.target.value)
    let texto=event.target.value;
    
    let coincidencias=[]

    for(let i=0;i<this.respaldoProfesoresObject.length;i+=1){
        let objeto=this.respaldoProfesoresObject[i]

       
        let nombreEncontrado=objeto.nombres.toLowerCase().indexOf(texto);
        let apellidoEncontrado= objeto.apellidos.toLowerCase().indexOf(texto);
        let cedulaEncontrada= objeto.cedula.toLowerCase().indexOf(texto);

        if(nombreEncontrado!=-1 || apellidoEncontrado!=-1 || cedulaEncontrada!=-1){
          coincidencias.push(objeto);
        }
    }

    this.profesoresObject=coincidencias;
    
  }

  validationView():boolean{
    let nombres_apelllidos=$("#view_input_nombres").val();

    let arreglo=nombres_apelllidos.split(' ')
    if(arreglo.length != 4)
      this.val01=true;
    else
      this.val01=false;
    let direccion=$("#view_input_direccion").val();
    if(direccion.length==0)
      this.val02=true;
    else
      this.val02=false;
    let telefono=$("#view_input_telefono").val();
    if(telefono.length==0)
      this.val03=true;
    else
      this.val03=false;
    let fecha=$("#view_input_fecha").val();
    if(fecha.length==0)
      this.val04=true;
    else
      this.val05=false;
    let ciudad=$("#view_input_ciudad").val();
    if(ciudad.length==0)
      this.val05=true;
    else
      this.val05=false
    if(this.val01 || this.val02 || this.val03 || this.val04 || this.val05)
      return false;
    return true;
  }

  resetValidation(){
    this.val01=false;
    this.val02=false;
    this.val03=false;
    this.val04=false;
    this.val05=false;
    this.val06=false;
    this.val07=false;
    this.val08=false;
    this.val09=false;
    this.val10=false;
    this.val11=false;
    this.val12=false;
    this.val13=false;
    this.val14=false;
  }
  validationRegister():boolean{
    let email=$('#view_inputCrear_correo').val();
    if(email.length == 0)
      this.val06=true;
    else
      this.val06=false;
    let password=$('#view_inputCrear_password').val();
    if(password.length == 0)
      this.val07=true;
    else
      this.val07=false;    
    let nombres=$('#view_inputCrear_nombres').val();
    let arregloN=nombres.split(' ')
    if(arregloN.length != 2)
      this.val08=true;
    else
      this.val08=false;
    let apellidos=$('#view_inputCrear_apellidos').val();
    let arregloA=apellidos.split(' ')
    if(arregloA.length != 2)
      this.val09=true;
    else
      this.val09=false;
    let cedula=$('#view_inputCrear_cedula').val()
    if(cedula.length == 0)
      this.val10=true;
    else
      this.val10=false; 
    let fecha=$('#view_inputCrear_fecha').val();
    if(fecha.length == 0)
      this.val04=true;
    else
      this.val04=false; 
    let direccion=$('#view_inputCrear_direccion').val();
    if(direccion.length == 0)
      this.val02=true;
    else
      this.val02=false; 
    let telefono=$('#view_inputCrear_telefono').val();
    if(telefono.length == 0)
      this.val03=true;
    else
      this.val03=false; 
    let ciudad=$('#view_inputCrear_ciudad').val();
    if(ciudad.length == 0)
      this.val05=true;
    else
      this.val05=false; 
    if(this.val06 || this.val07 || this.val08 || this.val09 || this.val10 || this.val04
      || this.val02 || this.val03 || this.val05)
      return false;
    return true;
  }

  inicializarPaises() {
    this.estudianteService.obtenerDataPaises().subscribe((data) => {
      var anydata = <any>data;
      this.countryData = anydata;
    });
  }

  inicializarCiudades() {
    this.estudianteService.obtenerDataCiudades().subscribe((data) => {
      var anydata = <any>data;
      this.cityData = anydata;
    });

  }

  setCitiesValues(countrySelected) {
    this.cities = this.cityData.filter(ciudad => ciudad.country_id == countrySelected.id)
  }

 
  callFunction() {
    if(this.key){
      $("#view_input_pais").val(this.country);
      this.key=false;      
    }
  }

}
