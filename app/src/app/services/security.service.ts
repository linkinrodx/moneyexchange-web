import { Injectable } from '@angular/core';
import { UserResponse } from '../models/response/user.response';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityPath } from './security.path';
import { LoginRequest } from '../models/request/login.request';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService, MessageSeverity } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  moneyExchangeAPI : string;

  constructor(
    private http: HttpClient,
    private router : Router,
    private alertService : AlertService
  ) {
    this.moneyExchangeAPI = environment.moneyExchangeAPI;
  }

  getUsuario(){
    var user;
    if (JSON.parse(localStorage.getItem("user"))) {
      user = new UserResponse(JSON.parse(localStorage.getItem("user")));
    }
    else{
      user = null;
    }
    return user;
  }

  login(request : LoginRequest){
    return this.http.post(`${this.moneyExchangeAPI}${SecurityPath.login}`, request)
      .pipe(map((response: any) => {
        if(response && response.code == 200 && response.result){
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(response.result))
          
          this.router.navigate(["dashboard"]);

          this.alertService.showMessage("Success", "Welcome back!", MessageSeverity.success)
        }
        else{
          this.alertService.showMessage("Warning", "Incorrect User", MessageSeverity.warn)
        }

        return response;
      }, )) as Observable<any>;
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }
}
