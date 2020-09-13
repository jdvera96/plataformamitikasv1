import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient) { }

  enviarNotificacion(objeto){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/sendnotificacion",{
      "titulo":objeto.titulo ,
      "body" : objeto.descripcion});
  }

  enviarNotificacionPorClase(objeto){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/sendnotificacionbycurso",{
      "titulo":objeto.titulo ,
      "body" : objeto.descripcion,
      "id_clase":objeto.id_clase
    });
  }

  enviarNotificacionPorGrupo(objeto){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/sendnotificacionbygrupo",{
      "titulo":objeto.titulo ,
      "body" : objeto.descripcion,
      "grupo" :objeto.grupo
    });
  }
}

