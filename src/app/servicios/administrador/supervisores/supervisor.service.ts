import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  constructor(public http : HttpClient) { }

  crearSupervisor(data){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/auth/register/supervisor",data);
  }

  obtenerTodosSupervisor(){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getsupervisores");
  }

  obtenerInfoSupervisor(id_supervisor: string){
    return this.http.get("https://patricioxavi10.pythonanywhere.com/api/getsupervisor/"+id_supervisor);
  }

  actualizarInfoSupervisor(id_supervisor: string,data){
    return this.http.put("https://patricioxavi10.pythonanywhere.com/api/supervisor/update/"+id_supervisor,data);
  }

  eliminarSupervisor(id_profesor: string){
    return this.http.patch("https://patricioxavi10.pythonanywhere.com/api/supervisor/update/"+id_profesor,{'estado': false});
  }
}
