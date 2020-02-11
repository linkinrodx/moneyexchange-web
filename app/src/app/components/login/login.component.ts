import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { LoginRequest } from 'src/app/models/request/login.request';
import { AlertService, MessageSeverity } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin : FormGroup;
  username : FormControl;
  password : FormControl;

  constructor(
    private router : Router,
    private security: SecurityService,
    private alertService: AlertService
  ) { 
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(){
    this.username = new FormControl(null, Validators.required);
    this.password = new FormControl(null, Validators.required);
    
    this.formLogin = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  login(){
    if (!this.formLogin.valid) {
      this.alertService.showMessage("Warning", "Complete the form", MessageSeverity.warn);
      return;
    }
    
    var request = new LoginRequest();
    request.username = this.formLogin.controls["username"].value;
    request.password = this.formLogin.controls["password"].value;

    this.security.login(request).subscribe();
  }

  onkeypress(event){
    if (event.which == 13 || event.keyCode == 13) {
      this.login();
    }
  }
}
