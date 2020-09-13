import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class TareaService {

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

  registrarTarea(id_profesor,id_sesion,titulo,descripcion,fechaEntrega){
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/creartarea",{
      "nombre_tarea": titulo,
      "descripcion_tarea": descripcion,
      "url": "",
      "id_sesion":id_sesion,
      "id_profesor": id_profesor,
      "fecha_creacion": date,
      'fecha_entrega':fechaEntrega

    });
  }

  obtenerInfoTarea(id_tarea){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getTarea/"+id_tarea);
  }

  eliminarTarea(id_tarea){
    return this.http.patch("https://patricioxavi10.pythonanywhere.com/api/eliminartarea",{"id_tarea": id_tarea})
  }
}
