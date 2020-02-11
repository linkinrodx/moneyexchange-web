import { Injectable } from '@angular/core';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastaService: ToastaService, private toastaConfig: ToastaConfig) {
    this.toastaConfig.theme = 'bootstrap';
    this.toastaConfig.position = 'top-center';
    this.toastaConfig.limit = 1;
    this.toastaConfig.showClose = true;
  }

  public showMessage(title, message, severity, timeout = 5000) {
    var toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: timeout,
      theme: 'bootstrap'
    };
    if (severity == MessageSeverity.info)
      this.toastaService.info(toastOptions);
    else if (severity == MessageSeverity.default)
      this.toastaService.default(toastOptions);
    else if (severity == MessageSeverity.success)
      this.toastaService.success(toastOptions);
    else if (severity == MessageSeverity.error)
      this.toastaService.error(toastOptions);
    else if (severity == MessageSeverity.warn)
      this.toastaService.warning(toastOptions);
    else if (severity == MessageSeverity.wait)
      this.toastaService.wait(toastOptions);
  }
}

export enum MessageSeverity {
  default,
  info,
  success,
  error,
  warn,
  wait
}