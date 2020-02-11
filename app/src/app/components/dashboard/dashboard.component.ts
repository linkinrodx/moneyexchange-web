import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ExchangeRequest } from 'src/app/models/request/exchange.request';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { AlertService, MessageSeverity } from 'src/app/services/alert.service';
import { AppConstants } from 'src/app/shared/common/app.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  formExchange : FormGroup;
  startCurrency : FormControl;
  targetCurrency : FormControl;

  constructor(
    private securityService : SecurityService,
    private currencyService : CurrencyService,
    private currencyPipe : CurrencyPipe,
    private alertService : AlertService
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(){
    this.startCurrency = new FormControl(null, Validators.required);
    this.targetCurrency = new FormControl({value : "", disabled: true});
    
    this.formExchange = new FormGroup({
      startCurrency: this.startCurrency,
      targetCurrency: this.targetCurrency
    });
  }

  calculate(){
    if (!this.formExchange.valid) return;

    var request = new ExchangeRequest();
    request.UserId = this.securityService.getUsuario().userId;
    request.StartCurrencyId = AppConstants.CurrencyTypes.USD;
    request.TargetCurrencyId = AppConstants.CurrencyTypes.EUR;
    request.StartValue = Number.parseFloat(this.currencyInputChanged(this.formExchange.controls["startCurrency"].value));

    this.currencyService.exchange(request).subscribe(response => {
      if (response && response.code == 200 && response.result){        
        var value = this.currencyPipe.transform(response.result.targetValue, 'EUR');
        this.formExchange.controls["targetCurrency"].setValue(value);

        this.startTimer();
      }
    },
    error => {
      if (error && error.messageException){
        this.alertService.showMessage("Error", error.messageException, MessageSeverity.error);
      }
      else{
        this.alertService.showMessage("Error", "Contact the system administrator.", MessageSeverity.error);
      }
    });
  }


  interval;
  minuteLeft: number = 0;
  timeLeft: number = 0;
  minuteString: string = "00";
  timeString: string = "00";

  startTimer() {
    if (this.interval) clearInterval(this.interval);

    this.minuteLeft = 10;
    this.timeLeft = 0;
    this.setString();

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.setString();
      } else {
        if (this.minuteLeft > 0) {
          this.minuteLeft--;
          this.timeLeft = 59;
          this.setString();
        }
        else{
          this.minuteLeft = 0;
          this.timeLeft = 0;
          this.setString();
          this.pauseTimer();
        }
      }
    },1000)
  }

  setString(){
    this.minuteString = ("0" + this.minuteLeft).slice(-2);
    this.timeString = ("0" + this.timeLeft).slice(-2);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.formExchange.controls["targetCurrency"].setValue("");
    this.calculate();
  }

  transformAmountUSD(element){
    var value = this.currencyInputChanged(this.formExchange.controls["startCurrency"].value);
    element.target.value = this.currencyPipe.transform(value, 'USD', undefined, '1.4-4');

    //this.startCurrency = this.currencyPipe.transform(this.startCurrency, 'USD');
    //element.target.value = this.startCurrency;
  }
  
  transformAmountEUR(element){
    // this.targetCurrency = this.currencyPipe.transform(this.targetCurrency, 'EUR');

    // element.target.value = this.targetCurrency;
  }
  
  keyPress(event: any) {
    const pattern = new RegExp("^[0-9]+$");
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
        event.preventDefault();
    }
  }

  logout(){
    this.securityService.logout();
  }

  // currencyInputChanged(value) {
  //   var num = value ? value.replace(/[$,]/g, "") : "";
  //   return Number(num);
  // }

  currencyInputChanged(value) {
    var num = value ? value.replace(/[$,]/g, "") : "";
    return num;
  }
}
