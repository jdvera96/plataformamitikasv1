import { Injectable } from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http : HttpClient) { }

  crearProfesor(data){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/auth/register/profesor",data);
  }

  obtenerTodosProfesores(){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getprofesores");
  }

  obtenerInfoProfesor(id_profesor: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getprofesor/"+id_profesor);
  }

  actualizarInfoProfesor(id_profesor: string,data){
    return this.http.put("https://patricioxavi10.pythonanywhere.com/api/profesor/update/"+id_profesor,data);
  }

  eliminarProfesor(id_profesor: string){
    return this.http.patch("https://patricioxavi10.pythonanywhere.com/api/profesor/update/"+id_profesor,{'estado': false});
  }
}
