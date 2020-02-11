import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private securityService: SecurityService, 
    private router: Router) 
    {  }
  
  canActivate() {
    if (this.securityService.getUsuario()) {
        return true;
    }
    
    this.router.navigate(['login']);
    return false;
  }
  
}
