import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CurrencyPath } from './currency.path';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExchangeRequest } from '../models/request/exchange.request';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  moneyExchangeAPI : string;

  constructor(
    private http: HttpClient
  ) {
    this.moneyExchangeAPI = environment.moneyExchangeAPI;
  }

  exchange(request : ExchangeRequest){
    return this.http.post(`${this.moneyExchangeAPI}${CurrencyPath.exchange}`, request)
      .pipe(map((response: any) => {
        return response;
      }, )) as Observable<any>;
  }
}
