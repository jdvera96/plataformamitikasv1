import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2'

import {AuthService} from '../../../servicios/auth.service'


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  elemento: string;
  inputText;
  public correo: string;
  public password: string;
  constructor(private servicioApiLogin : AuthService,
) { }

  ngOnInit(): void {
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
            event.preventDefault();
            event.stopPropagation();
          }, false);
        });
      }, false);
    })();

    

  }


  logearse(){
    this.correo=$('#correo').val().toString();
    this.password=$('#password').val().toString();
    console.log('valor del correo: ',this.correo);
    console.log('valor del pass: ',this.password);
    if(this.correo.length>0 && this.password.length>0)
      this.verificarCredenciales();
    
  }

  verificarCredenciales(){
      Swal.fire({
        title: 'Cargando',          
        onBeforeOpen: () => {
          Swal.showLoading()           
        },
        allowOutsideClick: false
      })
      this.servicioApiLogin.obtenerLogin(this.correo,this.password).subscribe(response=>{
        console.log('resultado: ',response);        
        
        if(response["isAdmin"]){
          let valor="Administrador-Admin-Admin-Admin";
          localStorage.setItem('login-mitikas',valor);
          Swal.close();
          location.href="http://localhost:4200/";
        }
        else if(response["rol"]){

          let valor=response["rol"]+"-"+response["nombre"]+"-"+response["apellido"]+"-"+response["cedula"];
          localStorage.setItem('login-mitikas',valor);
          Swal.close();
          location.href="http://localhost:4200/";
        }else{
          console.log('credenciales invalidas');
          //Swal.stopLoading();          
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Credenciales inválidas',
            text: 'Porfavor vuelva a intentarlo'
          })
        }
        
      });
      
  }

}
