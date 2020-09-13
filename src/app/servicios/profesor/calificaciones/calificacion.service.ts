import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  constructor(private http : HttpClient) { }

  obtenerTareas(id_clase: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/alltareas/"+id_clase);
  }

  obtenerCalificaciones_Estudiantes(id_tarea){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/listcalificacion/"+id_tarea);
  }

   asignarCalificacion(calificacion,id_tarea,id_estudiante){
    return this.http.patch("https://patricioxavi10.pythonanywhere.com/api/calificar",
    {"calificacion": calificacion, "id_tarea": id_tarea, "id_estudiante": id_estudiante})
  } 
}
