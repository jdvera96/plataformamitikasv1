import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http : HttpClient) { }

  obtenerCursos(id_supervisor){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getclasessupervisor/"+id_supervisor)
  }

  obtenerListado(id_curso){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getclase/"+id_curso)
  }

}
