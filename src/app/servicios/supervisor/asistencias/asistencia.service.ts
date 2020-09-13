import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http : HttpClient) { }

  obtenerSesiones(id_clase: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/sesiones/"+id_clase);
  }

  obtenerAsistencia_Estudiantes(id_sesion){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getasistencias/"+id_sesion);
  }

   asignarAsistencia(id_sesion,id_estudiante,asistencia){
    return this.http.patch("https://patricioxavi10.pythonanywhere.com/api/asistencia",
    {"id_sesion": id_sesion, "id_estudiante": id_estudiante,"asistencia": asistencia})
  }
}
