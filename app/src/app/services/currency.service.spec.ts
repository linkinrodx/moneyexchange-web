import { TestBed, async } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { AppModule } from '../app.module';

import { ExchangeRequest } from '../models/request/exchange.request';
import { AppConstants } from '../shared/common/app.constants';

describe('CurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [AppModule]
  }));

  it('should be created', () => {
    const service: CurrencyService = TestBed.get(CurrencyService);
    expect(service).toBeTruthy();
  });

  it('should be a response', async (() => {
    const service: CurrencyService = TestBed.get(CurrencyService);

    var request = new ExchangeRequest();
    request.UserId = 1;
    request.StartCurrencyId = AppConstants.CurrencyTypes.USD;
    request.TargetCurrencyId = AppConstants.CurrencyTypes.EUR;
    request.StartValue = 150.15;

    service.exchange(request).subscribe(response => {
      expect(response).not.toBeNull();
      expect(response.result).not.toBeNull();
    });
  }));
});
