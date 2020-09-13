import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http : HttpClient) { }


  crearEstudiante(data){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/auth/register/user",data);
  }

  obtenerTodosEstudiantes(){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getstudents");
  }

  obtenerInfoEstudiante(id_estudiante: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getstudent/"+id_estudiante);
  }

  actualizarInfoEstudiante(id_estudiante: string,data){
    return this.http.put("https://patricioxavi10.pythonanywhere.com/api/estudiante/update/"+id_estudiante,data);
  }

  eliminarEstudiante(id_estudiante: string){
    return this.http.patch("https://patricioxavi10.pythonanywhere.com/api/estudiante/update/"+id_estudiante,{'estado': false});
  }
  
  obtenerDataPaises() {
    return this.http.get('assets/archivos/countries.json');
  }

  obtenerDataCiudades() {
    return this.http.get('assets/archivos/cities.json');
  }
}
