import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class TareasSpService {

  constructor(private http : HttpClient) { }

  obtenerTareas(id_clase: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/alltareas/"+id_clase);
  }

  obtenerSesiones(id_clase: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/sesiones/"+id_clase);
  }

  obtenerInfoSesion(id_sesion){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getsesion/"+id_sesion);
  }

  registrarTarea(id_profesor,id_sesion,titulo,descripcion){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/creartarea",{
      "nombre_tarea": titulo,
      "descripcion_tarea": descripcion,
      "id_sesion": id_sesion,
      "id_profesor": id_profesor
    });
  }

  obtenerInfoTarea(id_tarea){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getTarea/"+id_tarea);
  }

  eliminarTarea(id_tarea){
    return this.http.patch("https://patricioxavi10.pythonanywhere.com/api/eliminartarea",{"id_tarea": id_tarea})
  }
}
