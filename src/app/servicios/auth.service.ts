import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http'
import 'rxjs/add/operator/catch'; // don't forget this, or you'll get a runtime error

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { 

  }

  obtenerLogin(correo: string, password: string){
    return this.http.post("https://patricioxavi10.pythonanywhere.com/api/auth/login/user",{username: correo, password: password}).catch((err: HttpErrorResponse) => {
      // simple logging, but you can do a lot more, see below
      return '0';
    });
    
  }

}
